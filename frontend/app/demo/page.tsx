"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Play, Square, RefreshCw, AlertTriangle, CheckCircle, User } from "lucide-react"

export default function DemoPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // Mock employee data
  const mockEmployee = {
    name: "John Doe",
    position: "Marketing Manager",
    division: "Marketing",
    id: "EMP001",
    avatar: "/placeholder.svg?height=80&width=80",
  }

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

          setScanResult({
            employee: mockEmployee,
            stressLevel,
            confidence: 85 + Math.random() * 15,
            emotions,
            timestamp: new Date().toISOString(),
            recommendations: getRecommendations(stressLevel),
          })
          setIsAnalyzing(false)
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <Link href="/" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Demo Scan Wajah EmoCollab</h1>
              <p className="text-gray-600">Coba fitur deteksi tingkat stres melalui analisis ekspresi wajah</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EmoCollab
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Live Camera Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-80 object-cover transform scale-x-[-1]"
                    style={{ filter: isScanning ? "none" : "blur(10px)" }}
                  />

                  {/* Face Detection Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-48 h-48 border-2 rounded-lg ${
                          faceDetected ? "border-green-400" : "border-red-400"
                        } animate-pulse`}
                      >
                        <div className="absolute -top-6 left-0 right-0 text-center">
                          <Badge className={faceDetected ? "bg-green-500" : "bg-red-500"}>
                            {faceDetected ? "Wajah Terdeteksi" : "Wajah Tidak Terdeteksi"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-center text-white">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Klik "Mulai Kamera" untuk memulai</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Camera Controls */}
                <div className="flex gap-4 justify-center">
                  {!isScanning ? (
                    <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Mulai Kamera
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={stopCamera}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Stop Kamera
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
                          <>
                            <Camera className="w-4 h-4 mr-2" />
                            Mulai Analisis
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>

                {/* Analysis Progress */}
                {isAnalyzing && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Menganalisis ekspresi wajah...</span>
                      <span>{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Employee Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Data Karyawan (Demo)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mockEmployee.avatar || "/placeholder.svg"} alt={mockEmployee.name} />
                    <AvatarFallback className="text-lg">{mockEmployee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{mockEmployee.name}</h3>
                    <p className="text-gray-600">{mockEmployee.position}</p>
                    <p className="text-sm text-gray-500">{mockEmployee.division}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>ID:</strong> {mockEmployee.id}
                  </p>
                  <p>
                    <strong>Status:</strong> <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Scan Results */}
            {scanResult ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Hasil Analisis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stress Level */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Tingkat Stres:</span>
                      <Badge className={getStressLevelBg(scanResult.stressLevel)}>
                        {getStressLevelText(scanResult.stressLevel)}
                      </Badge>
                    </div>
                    <Progress value={scanResult.stressLevel} className="h-3 mb-1" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0%</span>
                      <span className={getStressLevelColor(scanResult.stressLevel)}>{scanResult.stressLevel}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Confidence:</span>
                      <span className="text-blue-600">{Math.round(scanResult.confidence)}%</span>
                    </div>
                    <Progress value={scanResult.confidence} className="h-2" />
                  </div>

                  {/* Emotions Breakdown */}
                  <div>
                    <h4 className="font-medium mb-3">Detail Emosi:</h4>
                    <div className="space-y-2">
                      {Object.entries(scanResult.emotions).map(([emotion, value]) => (
                        <div key={emotion} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{emotion}:</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${(value as number) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 w-8">{Math.round((value as number) * 100)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning for High Stress */}
                  {scanResult.stressLevel >= 70 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-800 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Peringatan Tingkat Stres Tinggi</span>
                      </div>
                      <p className="text-sm text-red-700">Segera lakukan intervensi atau konsultasi dengan HRD.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Hasil Analisis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Mulai scan untuk melihat hasil analisis</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {scanResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Rekomendasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scanResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-600 font-bold mt-1">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tentang Demo Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Cara Kerja:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>1. Kamera menganalisis ekspresi wajah secara real-time</li>
                  <li>2. Sistem mendeteksi berbagai emosi (senang, sedih, marah, dll)</li>
                  <li>3. Algoritma menghitung tingkat stres berdasarkan kombinasi emosi</li>
                  <li>4. Hasil ditampilkan dengan rekomendasi yang sesuai</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Fitur Lengkap:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Deteksi wajah otomatis saat login</li>
                  <li>• Riwayat tingkat stres harian/mingguan</li>
                  <li>• Chat real-time dengan HRD</li>
                  <li>• Dashboard analytics untuk manajemen</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Catatan:</strong> Ini adalah demo dengan data simulasi. Untuk implementasi penuh, sistem akan
                terintegrasi dengan database karyawan dan model AI yang lebih akurat.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
