"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Camera, AlertTriangle, CheckCircle, Loader2, RefreshCw, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Face detection and emotion analysis
interface DetectionResult {
  name: string
  age: number
  position: string
  division: string
  stressLevel: number
  emotions: {
    happy: number
    sad: number
    angry: number
    fearful: number
    disgusted: number
    surprised: number
    neutral: number
  }
  confidence: number
}

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResult, setScanResult] = useState<DetectionResult | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [faceDetected, setFaceDetected] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)

  // Check camera permission
  const checkCameraPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "camera" as PermissionName })
      setPermissionGranted(result.state === "granted")
      return result.state === "granted"
    } catch (error) {
      // Fallback for browsers that don't support permissions API
      return false
    }
  }

  // Initialize camera
  const startCamera = async () => {
    try {
      setError(null)
      setIsLoading(true)

      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      console.log("Requesting camera access...")

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

      console.log("Camera stream obtained:", stream)

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        // Wait for video to be ready
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error("Video element not found"))
            return
          }

          const video = videoRef.current

          const onLoadedMetadata = () => {
            console.log("Video metadata loaded:", {
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
              readyState: video.readyState,
            })

            video.removeEventListener("loadedmetadata", onLoadedMetadata)
            video.removeEventListener("error", onError)
            resolve()
          }

          const onError = (e: Event) => {
            console.error("Video error:", e)
            video.removeEventListener("loadedmetadata", onLoadedMetadata)
            video.removeEventListener("error", onError)
            reject(new Error("Video failed to load"))
          }

          video.addEventListener("loadedmetadata", onLoadedMetadata)
          video.addEventListener("error", onError)

          // Try to play the video
          video.play().catch((playError) => {
            console.error("Video play error:", playError)
            reject(playError)
          })
        })

        setCameraActive(true)
        setPermissionGranted(true)

        // Start face detection after a short delay
        setTimeout(() => {
          startFaceDetection()
        }, 1000)

        console.log("Camera started successfully")
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      let errorMessage = "Tidak dapat mengakses kamera."

      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          errorMessage = "Akses kamera ditolak. Silakan berikan izin kamera dan muat ulang halaman."
        } else if (err.name === "NotFoundError") {
          errorMessage = "Kamera tidak ditemukan. Pastikan kamera terhubung dengan benar."
        } else if (err.name === "NotReadableError") {
          errorMessage = "Kamera sedang digunakan oleh aplikasi lain."
        } else if (err.name === "OverconstrainedError") {
          errorMessage = "Kamera tidak mendukung pengaturan yang diminta."
        } else {
          errorMessage = `Error: ${err.message}`
        }
      }

      setError(errorMessage)
      setCameraActive(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Stop camera
  const stopCamera = () => {
    console.log("Stopping camera...")

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        console.log("Stopping track:", track.kind, track.label)
        track.stop()
      })
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCameraActive(false)
    setFaceDetected(false)
    setError(null)
  }

  // Face detection loop
  const startFaceDetection = () => {
    let animationId: number

    const detectFace = () => {
      if (!videoRef.current || !canvasRef.current || !cameraActive) {
        return
      }

      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
        try {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0)

          // Simple face detection simulation
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const hasface = simulateFaceDetection(imageData)
          setFaceDetected(hasface)
        } catch (error) {
          console.error("Face detection error:", error)
        }
      }

      if (cameraActive && !isScanning) {
        animationId = requestAnimationFrame(detectFace)
      }
    }

    detectFace()

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }

  // Simulate face detection
  const simulateFaceDetection = (imageData: ImageData): boolean => {
    // Simple brightness-based detection as a placeholder
    const { data } = imageData
    let brightness = 0
    let pixels = 0

    // Sample every 100th pixel for performance
    for (let i = 0; i < data.length; i += 400) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      brightness += (r + g + b) / 3
      pixels++
    }

    const avgBrightness = brightness / pixels
    // Face detected if there's reasonable brightness variation (indicating presence)
    return avgBrightness > 50 && avgBrightness < 200
  }

  // Capture and analyze face
  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsScanning(true)
    setScanComplete(false)
    setScanProgress(0)
    setError(null)

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx && videoRef.current) {
        // Ensure canvas matches video dimensions
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight

        // Draw current video frame
        ctx.drawImage(videoRef.current, 0, 0)

        // Convert to blob for API call
        canvas.toBlob(
          async (blob) => {
            if (blob) {
              await analyzeWithAPI(blob)
            } else {
              throw new Error("Failed to capture image")
            }
          },
          "image/jpeg",
          0.8,
        )
      }
    } catch (err) {
      console.error("Error capturing image:", err)
      setError("Gagal mengambil gambar untuk analisis")
      setIsScanning(false)
    }
  }

  // Analyze with API
  const analyzeWithAPI = async (imageBlob: Blob) => {
    try {
      // Simulate API call progress
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Simulate API processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      setScanProgress(100)

      // Mock analysis result
      const mockResult: DetectionResult = {
        name: "Budi Santoso",
        age: 32,
        position: "Software Engineer",
        division: "Engineering",
        stressLevel: Math.floor(Math.random() * 40) + 40, // 40-80%
        emotions: {
          happy: Math.random() * 0.3,
          sad: Math.random() * 0.2,
          angry: Math.random() * 0.3,
          fearful: Math.random() * 0.4,
          disgusted: Math.random() * 0.1,
          surprised: Math.random() * 0.2,
          neutral: Math.random() * 0.5,
        },
        confidence: 0.85 + Math.random() * 0.15,
      }

      setScanResult(mockResult)
      setScanComplete(true)
    } catch (err) {
      console.error("Error analyzing image:", err)
      setError("Gagal menganalisis gambar. Silakan coba lagi.")
    } finally {
      setIsScanning(false)
    }
  }

  // Reset scan
  const resetScan = () => {
    setScanComplete(false)
    setScanProgress(0)
    setScanResult(null)
    setError(null)
  }

  // Check if browser supports camera
  const checkBrowserSupport = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  }

  // Cleanup on unmount
  useEffect(() => {
    // Check browser support on mount
    if (!checkBrowserSupport()) {
      setError("Browser Anda tidak mendukung akses kamera. Silakan gunakan browser yang lebih baru.")
    }

    return () => {
      stopCamera()
    }
  }, [])

  const getStressLevelText = (level: number) => {
    if (level < 40) return "Rendah"
    if (level < 70) return "Sedang"
    return "Tinggi"
  }

  const getStressLevelColor = (level: number) => {
    if (level < 40) return "text-green-600"
    if (level < 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (level: number) => {
    if (level < 40) return "bg-green-500"
    if (level < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getDominantEmotion = (emotions: DetectionResult["emotions"]) => {
    const emotionEntries = Object.entries(emotions)
    const dominant = emotionEntries.reduce((max, current) => (current[1] > max[1] ? current : max))
    return {
      name: dominant[0],
      value: dominant[1],
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <Link href="/" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Beranda
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Scan Wajah Real-time</h1>
          <p className="text-gray-600">Deteksi tingkat stress melalui analisis ekspresi wajah</p>
        </header>

        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
              {/* Video Element */}
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${cameraActive ? "block" : "hidden"}`}
                autoPlay
                muted
                playsInline
                style={{ transform: "scaleX(-1)" }} // Mirror effect
              />

              {/* Hidden canvas for image capture */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Camera not active state */}
              {!cameraActive && !isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Camera size={48} className="mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-4">Kamera tidak aktif</p>
                  <Button onClick={startCamera} className="bg-purple-600 hover:bg-purple-700">
                    <Video className="mr-2" size={16} />
                    Aktifkan Kamera
                  </Button>
                </div>
              )}

              {/* Loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                  <Loader2 size={48} className="mb-4 text-purple-500 animate-spin" />
                  <p className="text-white">Mengaktifkan kamera...</p>
                </div>
              )}

              {/* Face detection indicator */}
              {cameraActive && (
                <div className="absolute top-4 left-4">
                  <div
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                      faceDetected ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-white ${!faceDetected ? "animate-pulse" : ""}`} />
                    <span>{faceDetected ? "Wajah Terdeteksi" : "Mencari Wajah..."}</span>
                  </div>
                </div>
              )}

              {/* Camera info */}
              {cameraActive && (
                <div className="absolute top-4 right-4">
                  <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    <Video size={14} className="inline mr-1" />
                    Live
                  </div>
                </div>
              )}

              {/* Scanning overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
                  <div className="w-16 h-16 border-4 border-t-purple-500 border-purple-200 rounded-full animate-spin mb-4"></div>
                  <p className="mb-2">Menganalisis ekspresi wajah...</p>
                  <div className="w-full max-w-xs px-4">
                    <Progress value={scanProgress} className="bg-white bg-opacity-30" />
                    <p className="text-center text-sm mt-2">{scanProgress}%</p>
                  </div>
                </div>
              )}

              {/* Scan result overlay */}
              {scanComplete && scanResult && (
                <div className="absolute top-2 left-2 right-2 bg-white bg-opacity-95 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Hasil Analisis:</span>
                    <Badge className={`${getStressLevelColor(scanResult.stressLevel)} bg-opacity-20`}>
                      {getStressLevelText(scanResult.stressLevel)}
                    </Badge>
                  </div>
                  <Progress
                    value={scanResult.stressLevel}
                    className={`${getProgressColor(scanResult.stressLevel)} h-2`}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>Confidence: {Math.round(scanResult.confidence * 100)}%</span>
                    <span>{scanResult.stressLevel}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex space-x-2">
              {cameraActive && !isScanning && !scanComplete && (
                <>
                  <Button
                    onClick={captureAndAnalyze}
                    disabled={!faceDetected}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {faceDetected ? "Mulai Analisis" : "Posisikan Wajah"}
                  </Button>
                  <Button onClick={stopCamera} variant="outline">
                    Stop Kamera
                  </Button>
                </>
              )}

              {isScanning && (
                <Button disabled className="flex-1">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menganalisis...
                </Button>
              )}

              {scanComplete && (
                <div className="flex space-x-2 w-full">
                  <Button onClick={resetScan} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <RefreshCw className="mr-2" size={16} />
                    Scan Ulang
                  </Button>
                  <Button onClick={stopCamera} variant="outline">
                    Stop Kamera
                  </Button>
                </div>
              )}
            </div>

            {/* Debug info (remove in production) */}
            {process.env.NODE_ENV === "development" && cameraActive && videoRef.current && (
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                <p>Debug Info:</p>
                <p>Video Width: {videoRef.current.videoWidth}</p>
                <p>Video Height: {videoRef.current.videoHeight}</p>
                <p>Ready State: {videoRef.current.readyState}</p>
                <p>Face Detected: {faceDetected ? "Yes" : "No"}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {scanComplete && scanResult && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="mr-2 text-green-500" size={24} />
                Hasil Analisis Lengkap
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nama</p>
                    <p className="font-medium">{scanResult.name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Umur</p>
                    <p>{scanResult.age} tahun</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Jabatan</p>
                    <p>{scanResult.position}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Divisi</p>
                    <p>{scanResult.division}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tingkat Stress</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress value={scanResult.stressLevel} className="flex-1" />
                      <span className={`font-bold ${getStressLevelColor(scanResult.stressLevel)}`}>
                        {scanResult.stressLevel}%
                      </span>
                    </div>
                    <p className={`text-sm font-medium mt-1 ${getStressLevelColor(scanResult.stressLevel)}`}>
                      {getStressLevelText(scanResult.stressLevel)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Emosi Dominan</p>
                    <p className="font-medium capitalize">
                      {getDominantEmotion(scanResult.emotions).name} (
                      {Math.round(getDominantEmotion(scanResult.emotions).value * 100)}%)
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Confidence Level</p>
                    <p className="font-medium">{Math.round(scanResult.confidence * 100)}%</p>
                  </div>
                </div>
              </div>

              {/* Emotion breakdown */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-500 mb-3">Analisis Emosi Detail</p>
                <div className="space-y-2">
                  {Object.entries(scanResult.emotions).map(([emotion, value]) => (
                    <div key={emotion} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{emotion}</span>
                      <div className="flex items-center space-x-2 w-32">
                        <Progress value={value * 100} className="flex-1 h-2" />
                        <span className="text-xs w-8">{Math.round(value * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {scanResult.stressLevel >= 70 && (
                <Alert className="mt-6 bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Peringatan Tingkat Stress Tinggi</AlertTitle>
                  <AlertDescription className="text-red-700">
                    Tingkat stress terdeteksi tinggi. Disarankan untuk:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Beristirahat sejenak</li>
                      <li>Melakukan teknik pernapasan dalam</li>
                      <li>Berkonsultasi dengan HRD jika diperlukan</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
