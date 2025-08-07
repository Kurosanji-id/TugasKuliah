"use client"

import { useRef, useCallback, useEffect } from "react"

interface FaceDetectionOptions {
  onFaceDetected?: (detected: boolean) => void
  onError?: (error: string) => void
  detectionInterval?: number
}

export function useFaceDetection(options: FaceDetectionOptions = {}) {
  const { onFaceDetected, onError, detectionInterval = 100 } = options

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const detectionRef = useRef<number>()
  const isDetectingRef = useRef(false)

  // Simple face detection using basic image analysis
  const detectFace = useCallback((imageData: ImageData): boolean => {
    // This is a simplified face detection algorithm
    // In production, you would use face-api.js or similar library

    const { data, width, height } = imageData
    let skinPixels = 0
    let totalPixels = 0

    // Sample every 4th pixel for performance
    for (let i = 0; i < data.length; i += 16) {
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

  const startDetection = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || isDetectingRef.current) return

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
          onError?.("Error during face detection")
        }
      }

      if (isDetectingRef.current) {
        detectionRef.current = window.setTimeout(detect, detectionInterval)
      }
    }

    detect()
  }, [detectFace, onFaceDetected, onError, detectionInterval])

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
      stopDetection()
    }
  }, [stopDetection])

  return {
    videoRef,
    canvasRef,
    startDetection,
    stopDetection,
    captureFrame,
  }
}
