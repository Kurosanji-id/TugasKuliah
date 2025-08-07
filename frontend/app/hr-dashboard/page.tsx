"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BarChart3,
  MessageSquare,
  LogOut,
  Menu,
  X,
  AlertTriangle,
  Users,
  TrendingUp,
  Bell,
  FileText,
  UserCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import { LineChart, BarChart } from "@/components/ui/chart"

export default function HRDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  // Mock data for HR dashboard
  const hrProfile = {
    name: "Sarah Johnson",
    position: "HR Manager",
    division: "Human Resources",
    email: "sarah.johnson@emocollab.com",
    phone: "+62 812-9876-5432",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // HR navigation items with notification badges
  const navigationItems = [
    {
      href: "/hr-dashboard",
      icon: BarChart3,
      label: "Dashboard",
      description: "Overview dan statistik tim",
      badge: null,
    },
    {
      href: "/hr-stress-analytics",
      icon: TrendingUp,
      label: "Analytics Stress",
      description: "Analisis mendalam tingkat stress",
      badge: null,
    },
    {
      href: "/hr-notifications",
      icon: Bell,
      label: "Notifikasi",
      description: "Alert dan peringatan sistem",
      badge: 12,
    },
    {
      href: "/hr-messages",
      icon: MessageSquare,
      label: "Pesan",
      description: "Komunikasi dengan karyawan",
      badge: 5,
    },
    {
      href: "/reports",
      icon: FileText,
      label: "Laporan",
      description: "Generate dan export laporan",
      badge: null,
    },
    {
      href: "/hr-profile",
      icon: UserCheck,
      label: "Manajemen Karyawan",
      description: "Kelola data karyawan",
      badge: null,
    },
  ]

  // Mock statistics
  const stats = {
    totalEmployees: 156,
    highStressEmployees: 23,
    averageStressLevel: 45,
    activeAlerts: 12,
  }

  // Mock stress data
  const stressOverview = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    datasets: [
      {
        label: "Rata-rata Stress Tim",
        data: [42, 48, 45, 52, 45],
        borderColor: "rgb(124, 58, 237)",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const departmentStress = {
    labels: ["Engineering", "Marketing", "Sales", "Finance", "HR"],
    datasets: [
      {
        label: "Tingkat Stress per Departemen",
        data: [65, 42, 38, 55, 28],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
      },
    ],
  }

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedSidebarState = localStorage.getItem("hr-sidebar-open")
    if (savedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(savedSidebarState))
    }
    setIsLoaded(true)
  }, [])

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hr-sidebar-open", JSON.stringify(isSidebarOpen))
    }
  }, [isSidebarOpen, isLoaded])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("hr-sidebar")
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

  const handleLogout = () => {
    localStorage.removeItem("hr-sidebar-open")
    router.push("/login")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isActiveRoute = (href: string) => {
    return pathname === href
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
        id="hr-sidebar"
        className={`bg-white w-80 border-r border-gray-200 fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:transform-none transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
              EmoCollab HRD
            </h2>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* HR Profile Section */}
        <div className="p-4 border-b bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-purple-200">
              <AvatarImage src={hrProfile.avatar || "/placeholder.svg"} alt={hrProfile.name} />
              <AvatarFallback className="bg-purple-100 text-purple-700">{hrProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{hrProfile.name}</p>
              <p className="text-sm text-gray-600 truncate">{hrProfile.position}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                <span className="text-xs font-medium text-green-600">Online</span>
                <span className="text-xs text-gray-500 ml-2">• {stats.activeAlerts} alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Karyawan</p>
                  <p className="text-lg font-bold text-gray-900">{stats.totalEmployees}</p>
                </div>
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">High Stress</p>
                  <p className="text-lg font-bold text-red-600">{stats.highStressEmployees}</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-500" />
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
                      ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm border border-purple-200"
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
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Aksi Cepat</h3>
            <div className="space-y-2">
              <Link
                href="/hr-notifications"
                className="flex items-center justify-between px-3 py-2 text-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-colors"
                onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={16} />
                  <span>Notifikasi Urgent</span>
                </div>
                <Badge className="bg-white text-red-600 text-xs">12</Badge>
              </Link>
              <Link
                href="/hr-messages"
                className="flex items-center justify-between px-3 py-2 text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare size={16} />
                  <span>Pesan Karyawan</span>
                </div>
                <Badge className="bg-purple-600 text-white text-xs">5</Badge>
              </Link>
              <Link
                href="/reports"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
              >
                <FileText size={16} />
                <span>Generate Laporan</span>
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-80" : "lg:ml-0"}`}>
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              id="menu-button"
              className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard HRD</h1>
              <p className="text-sm text-gray-500">Selamat datang kembali, {hrProfile.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/hr-notifications">
              <Button size="sm" variant="outline" className="relative bg-transparent">
                <Bell size={16} className="mr-2" />
                Notifikasi
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                  {stats.activeAlerts}
                </Badge>
              </Button>
            </Link>
            <Link href="/reports">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                <FileText size={16} className="mr-2" />
                Laporan
              </Button>
            </Link>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Karyawan</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">High Stress</p>
                    <p className="text-2xl font-bold text-red-600">{stats.highStressEmployees}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rata-rata Stress</p>
                    <p className={`text-2xl font-bold ${getStressLevelColor(stats.averageStressLevel)}`}>
                      {stats.averageStressLevel}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.activeAlerts}</p>
                  </div>
                  <Bell className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-purple-600" />
                  Tren Stress Mingguan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LineChart
                    data={stressOverview}
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-purple-600" />
                  Stress per Departemen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart
                    data={departmentStress}
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
          </div>

          {/* Recent Alerts */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                  Alert Terbaru
                </div>
                <Link href="/hr-notifications">
                  <Button variant="outline" size="sm">
                    Lihat Semua
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", department: "Engineering", level: 85, time: "5 menit lalu" },
                  { name: "Jane Smith", department: "Marketing", level: 78, time: "12 menit lalu" },
                  { name: "Mike Johnson", department: "Sales", level: 72, time: "25 menit lalu" },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-red-100 text-red-700 text-sm">
                          {alert.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{alert.name}</p>
                        <p className="text-sm text-gray-600">{alert.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStressLevelBg(alert.level)}>{alert.level}% Stress</Badge>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
