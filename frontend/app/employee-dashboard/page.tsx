"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  BarChart3,
  MessageSquare,
  LogOut,
  Menu,
  X,
  AlertCircle,
  TrendingUp,
  User,
  Camera,
  History,
  Play,
  Square,
  RefreshCw,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import { LineChart } from "@/components/ui/chart"

interface ScanResult {
  stressLevel: number
  confidence: number
  emotions: {
    happy: number
    sad: number
    angry: number
    fearful: number
    neutral: number
    surprised: number
    disgusted: number
  }
  timestamp: string
  recommendations: string[]
}

export default function EmployeeDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Scan feature states
  const [isScanning, setIsScanning] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [scanError, setScanError] = useState<string | null>(null)

  // Mock data for stress levels
  const baseStressLevel = 75 // High stress level
  const currentStressLevel = scanResult ? scanResult.stressLevel : baseStressLevel

  const stressHistory = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    datasets: [
      {
        label: "Tingkat Stress",
        data: [45, 55, 60, 68, currentStressLevel],
        borderColor: "rgb(124, 58, 237)",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.3,
      },
    ],
  }

  // Employee profile data
  const profile = {
    name: "Budi Santoso",
    position: "Software Engineer",
    division: "Engineering",
    email: "budi.santoso@emocollab.com",
    phone: "+62 812-3456-7890",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // Employee navigation items
  const navigationItems = [
    {
      href: "/employee-dashboard",
      icon: BarChart3,
      label: "Dashboard",
      description: "Lihat ringkasan stress dan aktivitas",
    },
    {
      href: "/scan",
      icon: Camera,
      label: "Scan Wajah",
      description: "Deteksi tingkat stress real-time",
    },
    {
      href: "/employee-stress-history",
      icon: History,
      label: "Riwayat Stress",
      description: "Lihat histori tingkat stress",
    },
    {
      href: "/employee-messages",
      icon: MessageSquare,
      label: "Pesan",
      description: "Komunikasi dengan HRD",
    },
    {
      href: "/employee-profile",
      icon: User,
      label: "Profil",
      description: "Kelola informasi pribadi",
    },
  ]

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedSidebarState = localStorage.getItem("employee-sidebar-open")
    if (savedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(savedSidebarState))
    }
    setIsLoaded(true)
  }, [])

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("employee-sidebar-open", JSON.stringify(isSidebarOpen))
    }
  }, [isSidebarOpen, isLoaded])

  // Simulate receiving a message from HR
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Istirahat 10 menit")
      setShowMessage(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("employee-sidebar")
      const menuButton = document.getElementById("menu-button")

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setIsSidebarOpen(false)
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Face detection simulation
  useEffect(() => {
    if (isScanning && cameraActive) {
      const interval = setInterval(() => {
        setFaceDetected(Math.random() > 0.3)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isScanning, cameraActive])

  const handleLogout = () => {
    localStorage.removeItem("employee-sidebar-open")
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    router.push("/login")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isActiveRoute = (href: string) => {
    return pathname === href
  }

  // Camera functions
  const startCamera = async () => {
    try {
      setScanError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      streamRef.current = stream
      setCameraActive(true)
      setIsScanning(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setScanError("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCameraActive(false)
    setIsScanning(false)
    setFaceDetected(false)
    setScanResult(null)
    setScanError(null)
  }

  const startAnalysis = async () => {
    if (!faceDetected) {
      setScanError("Wajah tidak terdeteksi. Pastikan wajah Anda terlihat jelas di kamera.")
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setScanError(null)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)

          // Generate mock results
          const stressLevel = Math.floor(Math.random() * 60) + 30 // 30-90%
          const emotions = {
            happy: Math.random() * 0.4,
            sad: Math.random() * 0.3,
            angry: Math.random() * 0.4,
            fearful: Math.random() * 0.5,
            neutral: Math.random() * 0.6,
            surprised: Math.random() * 0.2,
            disgusted: Math.random() * 0.1,
          }

          const result: ScanResult = {
            stressLevel,
            confidence: 85 + Math.random() * 15,
            emotions,
            timestamp: new Date().toISOString(),
            recommendations: getRecommendations(stressLevel),
          }

          setScanResult(result)
          setIsAnalyzing(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const getRecommendations = (stressLevel: number): string[] => {
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

  const getStressLevelBg = (level: number) => {
    if (level < 40) return "bg-green-100 text-green-800"
    if (level < 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getProgressColor = (level: number) => {
    if (level < 40) return "bg-green-500"
    if (level < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Don't render until sidebar state is loaded to prevent flash
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        id="employee-sidebar"
        className={`bg-white w-72 border-r border-gray-200 fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:transform-none transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h2 className="text-xl font-bold text-purple-800">EmoCollab</h2>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-purple-200">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="bg-purple-100 text-purple-700">{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{profile.name}</p>
              <p className="text-sm text-gray-600 truncate">{profile.position}</p>
              <div className="flex items-center mt-1">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${getStressLevelColor(currentStressLevel).replace("text-", "bg-")}`}
                ></div>
                <span className={`text-xs font-medium ${getStressLevelColor(currentStressLevel)}`}>
                  Stress: {getStressLevelText(currentStressLevel)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu Utama</h3>
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-purple-100 text-purple-700 shadow-sm border border-purple-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                >
                  <Icon
                    size={20}
                    className={`mt-0.5 flex-shrink-0 ${
                      isActive ? "text-purple-600" : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${isActive ? "text-purple-700" : "text-gray-900"}`}>{item.label}</div>
                    <div className={`text-xs mt-0.5 ${isActive ? "text-purple-600" : "text-gray-500"}`}>
                      {item.description}
                    </div>
                  </div>
                  {isActive && <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>}
                </Link>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Aksi Cepat</h3>
            <div className="space-y-2">
              <button
                onClick={cameraActive ? stopCamera : startCamera}
                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors w-full ${
                  cameraActive
                    ? "text-red-600 bg-red-50 hover:bg-red-100"
                    : "text-white bg-purple-600 hover:bg-purple-700"
                }`}
              >
                <Camera size={16} />
                <span>{cameraActive ? "Stop Scan" : "Scan Sekarang"}</span>
              </button>
              <Link
                href="/employee-messages"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
              >
                <MessageSquare size={16} />
                <span>Hubungi HRD</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 text-gray-700 bg-white hover:bg-gray-50 transition-colors border-gray-300"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-0"}`}>
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              id="menu-button"
              className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"

            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard Karyawan</h1>
              <p className="text-sm text-gray-500">Selamat datang kembali, {profile.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={cameraActive ? stopCamera : startCamera}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                cameraActive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              <Camera size={16} />
              <span>{cameraActive ? "Stop Scan" : "Scan Wajah"}</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          {showMessage && (
            <Alert className="mb-6 bg-purple-50 border-purple-200">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <AlertTitle className="text-purple-800">Pesan dari HRD</AlertTitle>
              <AlertDescription className="text-purple-700">{message}</AlertDescription>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-purple-600 border-purple-200 bg-transparent hover:bg-purple-50"
                onClick={() => setShowMessage(false)}
              >
                Tutup
              </Button>
            </Alert>
          )}

          {scanError && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error Scan</AlertTitle>
              <AlertDescription className="text-red-700">{scanError}</AlertDescription>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-red-600 border-red-200 bg-transparent hover:bg-red-50"
                onClick={() => setScanError(null)}
              >
                Tutup
              </Button>
            </Alert>
          )}

          {/* Integrated Scan Feature */}
          <Card className="mb-6 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Camera className="mr-2 h-5 w-5 text-purple-600" />
                Scan Wajah Real-time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-64 object-cover transform scale-x-[-1]"
                  style={{ filter: cameraActive ? "none" : "blur(10px)" }}
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Face Detection Overlay */}
                {isScanning && cameraActive && (
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

                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center text-white">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Klik "Mulai Scan" untuk memulai</p>
                    </div>
                  </div>
                )}

                {/* Analysis Progress */}
                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 border-4 border-t-purple-500 border-purple-200 rounded-full animate-spin mb-4"></div>
                      <p className="mb-2">Menganalisis ekspresi wajah...</p>
                      <div className="w-full max-w-xs px-4">
                        <Progress value={analysisProgress} className="bg-white bg-opacity-30" />
                        <p className="text-center text-sm mt-2">{Math.round(analysisProgress)}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-2 justify-center mb-4">
                {!cameraActive ? (
                  <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Mulai Scan
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="border-red-200 text-red-600 bg-transparent"
                    >
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

              {/* Scan Results */}
              {scanResult && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
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

                  <div className="p-3 bg-white rounded border">
                    <h4 className="font-medium mb-2">Rekomendasi:</h4>
                    <ul className="space-y-1 text-sm">
                      {scanResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-purple-600 font-bold">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-1 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <User className="mr-2 h-5 w-5 text-purple-600" />
                  Profil Karyawan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24 mb-4 border-4 border-purple-100">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-gray-500">{profile.position}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Divisi</p>
                    <p className="font-medium">{profile.division}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm break-all">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telepon</p>
                    <p>{profile.phone}</p>
                  </div>
                </div>

                <Link href="/employee-profile" className="mt-4 block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit Profil
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-purple-600" />
                  Tingkat Stress Saat Ini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Level:</span>
                    <span className={`font-bold ${getStressLevelColor(currentStressLevel)}`}>
                      {getStressLevelText(currentStressLevel)} ({currentStressLevel}%)
                    </span>
                  </div>
                  <Progress value={currentStressLevel} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Rendah</span>
                    <span>Sedang</span>
                    <span>Tinggi</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                  <h4 className="font-medium mb-2 text-purple-800">Rekomendasi:</h4>
                  <ul className="space-y-2 text-sm">
                    {getRecommendations(currentStressLevel)
                      .slice(0, 3)
                      .map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-purple-600 font-bold">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                  </ul>

                  <div className="flex space-x-2 mt-4">
                    <Link href="/employee-messages">
                      <Button size="sm" variant="outline" className="text-purple-600 border-purple-300 bg-transparent">
                        Hubungi HRD
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={cameraActive ? startAnalysis : startCamera}
                      disabled={cameraActive && (!faceDetected || isAnalyzing)}
                    >
                      {cameraActive ? "Analisis Ulang" : "Scan Sekarang"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <History className="mr-2 h-5 w-5 text-purple-600" />
                  Riwayat Tingkat Stress
                </div>
                <Link href="/employee-stress-history">
                  <Button variant="outline" size="sm">
                    Lihat Semua
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart
                  data={stressHistory}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: "Tingkat Stress (%)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
