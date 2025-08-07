"use client"

import { useRef, useCallback, useEffect, useState } from "react"

interface FaceDetectionOptions {
  onFaceDetected?: (detected: boolean) => void
  onError?: (error: string) => void
  detectionInterval?: number
}

export function useFaceDetection(options: FaceDetectionOptions = {}) {
  const { onFaceDetected, onError, detectionInterval = 100 } = options

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const detectionRef = useRef<number>()
  const isDetectingRef = useRef(false)

  const [cameraActive, setCameraActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simple face detection using basic image analysis
  const detectFace = useCallback((imageData: ImageData): boolean => {
    const { data, width, height } = imageData
    let skinPixels = 0
    let totalPixels = 0

    // Sample every 16th pixel for performance
    for (let i = 0; i < data.length; i += 64) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Simple skin color detection
      if (
        r > 95 &&
        g > 40 &&
        b > 20 &&
        Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
        Math.abs(r - g) > 15 &&
        r > g &&
        r > b
      ) {
        skinPixels++
      }
      totalPixels++
    }

    const skinRatio = skinPixels / totalPixels
    return skinRatio > 0.02 // Threshold for face detection
  }, [])

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true)

      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const constraints = {
        video: {
          width: { ideal: 640, max: 1280 },
          height: { ideal: 480, max: 720 },
          facingMode: "user",
          frameRate: { ideal: 30, max: 30 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error("Video element not found"))
            return
          }

          const video = videoRef.current

          const onLoadedMetadata = () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata)
            video.removeEventListener("error", onError)
            resolve()
          }

          const onError = (e: Event) => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata)
            video.removeEventListener("error", onError)
            reject(new Error("Video failed to load"))
          }

          video.addEventListener("loadedmetadata", onLoadedMetadata)
          video.addEventListener("error", onError)

          video.play().catch(reject)
        })

        setCameraActive(true)
        startDetection()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      let errorMessage = "Tidak dapat mengakses kamera."

      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          errorMessage = "Akses kamera ditolak. Silakan berikan izin kamera."
        } else if (err.name === "NotFoundError") {
          errorMessage = "Kamera tidak ditemukan."
        } else if (err.name === "NotReadableError") {
          errorMessage = "Kamera sedang digunakan oleh aplikasi lain."
        }
      }

      setError(errorMessage)
      onError?.(errorMessage)
      setCameraActive(false)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    stopDetection()
    setCameraActive(false)
    setError(null)
  }, [])

  const startDetection = useCallback(() => {
    if (isDetectingRef.current) return

    isDetectingRef.current = true

    const detect = () => {
      if (!videoRef.current || !canvasRef.current || !isDetectingRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        try {
          ctx.drawImage(video, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const faceDetected = detectFace(imageData)
          onFaceDetected?.(faceDetected)
        } catch (error) {
          console.error("Face detection error:", error)
        }
      }

      if (isDetectingRef.current) {
        detectionRef.current = window.setTimeout(detect, detectionInterval)
      }
    }

    detect()
  }, [detectFace, onFaceDetected, detectionInterval])

  const stopDetection = useCallback(() => {
    isDetectingRef.current = false
    if (detectionRef.current) {
      clearTimeout(detectionRef.current)
    }
  }, [])

  const captureFrame = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!videoRef.current || !canvasRef.current) {
        resolve(null)
        return
      }

      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)

        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          "image/jpeg",
          0.8,
        )
      } else {
        resolve(null)
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return {
    videoRef,
    canvasRef,
    cameraActive,
    isLoading,
    error,
    startCamera,
    stopCamera,
    captureFrame,
  }
}
