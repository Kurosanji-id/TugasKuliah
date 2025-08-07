"use client"

import { useState } from "react"
import { Camera, Loader2, AlertTriangle, CheckCircle, RefreshCw, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { useFaceDetection } from "@/hooks/useFaceDetection"
import { faceAnalysisAPI, type FaceAnalysisResult } from "@/services/api"

interface ScanResult {
  emotions: {
    happy: number
    sad: number
    angry: number
    fearful: number
    disgusted: number
    surprised: number
    neutral: number
  }
  stressLevel: number
  confidence: number
  age?: number
  gender?: string
  employee?: {
    id: number
    name: string
    position: string
    division: string
  }
}

export function FaceScanner() {
  const [faceDetected, setFaceDetected] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scanComplete, setScanComplete] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const { videoRef, canvasRef, cameraActive, isLoading, error, startCamera, stopCamera, captureFrame } =
    useFaceDetection({
      onFaceDetected: setFaceDetected,
      onError: (err) => console.error("Face detection error:", err),
    })

  const analyzeImage = async () => {
    if (!cameraActive) return

    setIsScanning(true)
    setScanProgress(0)
    setApiError(null)
    setScanComplete(false)

    try {
      // Capture frame from video
      const imageBlob = await captureFrame()
      if (!imageBlob) {
        throw new Error("Failed to capture image")
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Call API
      const result: FaceAnalysisResult = await faceAnalysisAPI.analyzeImage(imageBlob)

      clearInterval(progressInterval)
      setScanProgress(100)

      if (result.success && result.data) {
        setScanResult({
          emotions: result.data.emotions,
          stressLevel: result.data.stress_level,
          confidence: result.data.confidence,
          age: result.data.age,
          gender: result.data.gender,
          employee: result.data.employee,
        })
        setScanComplete(true)

        // Save scan result
        try {
          await faceAnalysisAPI.saveScanResult({
            employee_id: result.data.employee?.id,
            stress_level: result.data.stress_level,
            emotions: result.data.emotions,
            confidence: result.data.confidence,
          })
        } catch (saveError) {
          console.error("Failed to save scan result:", saveError)
        }
      } else {
        throw new Error(result.error || "Analysis failed")
      }
    } catch (error) {
      console.error("Analysis error:", error)
      setApiError(error instanceof Error ? error.message : "Analysis failed")
    } finally {
      setIsScanning(false)
    }
  }

  const resetScan = () => {
    setScanComplete(false)
    setScanProgress(0)
    setScanResult(null)
    setApiError(null)
  }

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

  const getDominantEmotion = (emotions: ScanResult["emotions"]) => {
    const emotionEntries = Object.entries(emotions)
    const dominant = emotionEntries.reduce((max, current) => (current[1] > max[1] ? current : max))
    return {
      name: dominant[0],
      value: dominant[1],
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Face Scan Analysis</h1>
        <p className="text-gray-600">Deteksi tingkat stress melalui analisis ekspresi wajah</p>
      </div>

      {(error || apiError) && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Error</AlertTitle>
          <AlertDescription className="text-red-700">{error || apiError}</AlertDescription>
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
              style={{ transform: "scaleX(-1)" }}
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
                  <span className={`font-bold ${getStressLevelColor(scanResult.stressLevel)}`}>
                    {getStressLevelText(scanResult.stressLevel)}
                  </span>
                </div>
                <Progress value={scanResult.stressLevel} className="h-2" />
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
                  onClick={analyzeImage}
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
        </CardContent>
      </Card>

      {/* Detailed Results */}
      {scanComplete && scanResult && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="mr-2 text-green-500" size={24} />
              Hasil Analisis Lengkap
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {scanResult.employee && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nama</p>
                      <p className="font-medium">{scanResult.employee.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Jabatan</p>
                      <p>{scanResult.employee.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Divisi</p>
                      <p>{scanResult.employee.division}</p>
                    </div>
                  </>
                )}
                {scanResult.age && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estimasi Umur</p>
                    <p>{scanResult.age} tahun</p>
                  </div>
                )}
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
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Emosi Dominan</p>
                  <p className="font-medium capitalize">
                    {getDominantEmotion(scanResult.emotions).name} (
                    {Math.round(getDominantEmotion(scanResult.emotions).value * 100)}%)
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Confidence</p>
                  <p className="font-medium">{Math.round(scanResult.confidence * 100)}%</p>
                </div>
              </div>
            </div>

            {/* Emotion breakdown */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500 mb-3">Detail Analisis Emosi</p>
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
              <Alert className="mt-6 border-red-200 bg-red-50">
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
  )
}
