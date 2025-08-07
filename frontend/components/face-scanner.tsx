"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Camera, Play, Square, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

interface FaceScannerProps {
  onScanComplete?: (result: any) => void
  autoStart?: boolean
}

export default function FaceScanner({ onScanComplete, autoStart = false }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [scanResult, setScanResult] = useState<any>(null)

  useEffect(() => {
    if (autoStart) {
      startCamera()
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [autoStart])

  useEffect(() => {
    // Simulate face detection
    if (isScanning) {
      const interval = setInterval(() => {
        setFaceDetected(Math.random() > 0.3)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isScanning])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setStream(mediaStream)
      setIsScanning(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
    setFaceDetected(false)
    setScanResult(null)
  }

  const startAnalysis = async () => {
    if (!faceDetected) {
      alert("Wajah tidak terdeteksi. Pastikan wajah Anda terlihat jelas di kamera.")
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)

          // Generate mock results
          const stressLevel = Math.floor(Math.random() * 100)
          const emotions = {
            happy: Math.random() * 0.4,
            sad: Math.random() * 0.3,
            angry: Math.random() * 0.4,
            fearful: Math.random() * 0.5,
            neutral: Math.random() * 0.6,
            surprised: Math.random() * 0.2,
            disgusted: Math.random() * 0.1,
          }

          const result = {
            stressLevel,
            confidence: 85 + Math.random() * 15,
            emotions,
            timestamp: new Date().toISOString(),
            recommendations: getRecommendations(stressLevel),
          }

          setScanResult(result)
          setIsAnalyzing(false)

          if (onScanComplete) {
            onScanComplete(result)
          }

          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const getRecommendations = (stressLevel: number) => {
    if (stressLevel >= 70) {
      return [
        "Ambil istirahat 15-20 menit segera",
        "Lakukan teknik pernapasan dalam",
        "Pertimbangkan konsultasi dengan HRD",
        "Hindari tugas berat untuk sementara",
      ]
    } else if (stressLevel >= 40) {
      return [
        "Ambil istirahat singkat 5-10 menit",
        "Lakukan peregangan ringan",
        "Minum air putih yang cukup",
        "Atur prioritas tugas dengan baik",
      ]
    } else {
      return [
        "Pertahankan kondisi yang baik",
        "Tetap jaga pola istirahat",
        "Lanjutkan aktivitas normal",
        "Monitor kondisi secara berkala",
      ]
    }
  }

  const getStressLevelColor = (level: number) => {
    if (level < 40) return "text-green-600"
    if (level < 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStressLevelBg = (level: number) => {
    if (level < 40) return "bg-green-100 text-green-800"
    if (level < 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getStressLevelText = (level: number) => {
    if (level < 40) return "Rendah"
    if (level < 70) return "Sedang"
    return "Tinggi"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Emotion Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Camera Feed */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-64 object-cover transform scale-x-[-1]"
            style={{ filter: isScanning ? "none" : "blur(10px)" }}
          />

          {/* Face Detection Overlay */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-32 h-32 border-2 rounded-lg ${
                  faceDetected ? "border-green-400" : "border-red-400"
                } animate-pulse`}
              >
                <div className="absolute -top-6 left-0 right-0 text-center">
                  <Badge className={faceDetected ? "bg-green-500" : "bg-red-500"}>
                    {faceDetected ? "Terdeteksi" : "Tidak Terdeteksi"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center text-white">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Klik "Mulai Scan" untuk memulai</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {!isScanning ? (
            <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Mulai Scan
            </Button>
          ) : (
            <>
              <Button onClick={stopCamera} variant="outline" className="border-red-200 text-red-600 bg-transparent">
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
              <Button
                onClick={startAnalysis}
                disabled={!faceDetected || isAnalyzing}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  "Analisis"
                )}
              </Button>
            </>
          )}
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Menganalisis ekspresi...</span>
              <span>{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>
        )}

        {/* Results */}
        {scanResult && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Analisis Selesai</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Tingkat Stres:</span>
                <Badge className={getStressLevelBg(scanResult.stressLevel)}>
                  {getStressLevelText(scanResult.stressLevel)}
                </Badge>
              </div>
              <Progress value={scanResult.stressLevel} className="h-2 mb-1" />
              <div className="text-right">
                <span className={`text-sm ${getStressLevelColor(scanResult.stressLevel)}`}>
                  {scanResult.stressLevel}%
                </span>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-600">Confidence: {Math.round(scanResult.confidence)}%</span>
            </div>

            {scanResult.stressLevel >= 70 && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                <div className="flex items-center gap-1 text-red-800 mb-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span className="font-medium">Peringatan</span>
                </div>
                <p className="text-red-700">Tingkat stres tinggi terdeteksi</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
