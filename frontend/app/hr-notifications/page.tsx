"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Check,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: string
  type: "stress_high" | "stress_medium" | "stress_low" | "system" | "info"
  title: string
  message: string
  employee?: {
    name: string
    position: string
    division: string
    avatar: string
  }
  timestamp: Date
  isRead: boolean
  priority: "high" | "medium" | "low"
}

export default function HRNotifications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "stress_high",
      title: "Tingkat Stress Tinggi Terdeteksi",
      message: "Budi Santoso menunjukkan tingkat stress tinggi dan memerlukan perhatian segera",
      employee: {
        name: "Budi Santoso",
        position: "Software Engineer",
        division: "Engineering",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      priority: "high",
    },
    {
      id: "2",
      type: "stress_medium",
      title: "Tingkat Stress Sedang",
      message: "Dewi Lestari menunjukkan tingkat stress sedang, monitoring diperlukan",
      employee: {
        name: "Dewi Lestari",
        position: "UI/UX Designer",
        division: "Design",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "system",
      title: "Laporan Mingguan Tersedia",
      message: "Laporan analisis stress mingguan telah dibuat dan siap untuk ditinjau",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      priority: "low",
    },
    {
      id: "4",
      type: "info",
      title: "Karyawan Baru Terdaftar",
      message: "Ahmad Rizki telah terdaftar dalam sistem monitoring stress",
      employee: {
        name: "Ahmad Rizki",
        position: "Project Manager",
        division: "Management",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true,
      priority: "low",
    },
    {
      id: "5",
      type: "stress_high",
      title: "Stress Berkelanjutan",
      message: "Siti Rahayu menunjukkan tingkat stress tinggi selama 3 hari berturut-turut",
      employee: {
        name: "Siti Rahayu",
        position: "Marketing Specialist",
        division: "Marketing",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: false,
      priority: "high",
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "stress_high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "stress_medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "stress_low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "system":
        return <Info className="h-5 w-5 text-blue-500" />
      case "info":
        return <Users className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes} menit yang lalu`
    } else if (hours < 24) {
      return `${hours} jam yang lalu`
    } else {
      return `${days} hari yang lalu`
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.employee?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.employee?.division.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority = selectedPriority === "all" || notif.priority === selectedPriority
    const matchesDepartment = selectedDepartment === "all" || notif.employee?.division === selectedDepartment

    return matchesSearch && matchesPriority && matchesDepartment
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.isRead).length
  const stressAlertsCount = notifications.filter((n) => n.type.startsWith("stress") && !n.isRead).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/hr-dashboard">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft size={18} />
                  <span>Kembali ke Dashboard</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                <Bell className="h-6 w-6 text-purple-600" />
                <span>Notifikasi HRD</span>
                {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
              </h1>
            </div>

            <Button
              onClick={markAllAsRead}
              variant="outline"
              size="sm"
              disabled={unreadCount === 0}
              className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
            >
              <Check size={16} className="mr-2" />
              Tandai Semua Dibaca
            </Button>
          </div>
        </header>

        <main className="p-6">
          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari notifikasi, karyawan, atau departemen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Prioritas</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[140px]">
                      <Users className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Departemen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Departemen</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-purple-50">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Semua ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Belum Dibaca ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="high" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Prioritas Tinggi ({highPriorityCount})
              </TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Sistem ({notifications.filter((n) => n.type === "system").length})
              </TabsTrigger>
              <TabsTrigger value="stress" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Alert Stress ({stressAlertsCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Tidak ada notifikasi yang ditemukan</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`hover:shadow-md transition-all ${!notification.isRead ? "bg-purple-50 border-purple-200" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`font-medium ${!notification.isRead ? "text-purple-900" : "text-gray-900"}`}
                                >
                                  {notification.title}
                                </h3>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === "high"
                                    ? "Tinggi"
                                    : notification.priority === "medium"
                                      ? "Sedang"
                                      : "Rendah"}
                                </Badge>
                                {!notification.isRead && <div className="w-2 h-2 bg-purple-600 rounded-full" />}
                              </div>

                              <p className="text-gray-600 text-sm mb-2">{notification.message}</p>

                              {notification.employee && (
                                <div className="flex items-center space-x-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={notification.employee.avatar || "/placeholder.svg"}
                                      alt={notification.employee.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {notification.employee.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-500">
                                    {notification.employee.name} - {notification.employee.position}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {notification.employee.division}
                                  </Badge>
                                </div>
                              )}

                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimestamp(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Tandai Dibaca
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="unread">
              <div className="space-y-4">
                {filteredNotifications
                  .filter((n) => !n.isRead)
                  .map((notification) => (
                    <Card
                      key={notification.id}
                      className="bg-purple-50 border-purple-200 hover:shadow-md transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium text-purple-900">{notification.title}</h3>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === "high"
                                    ? "Tinggi"
                                    : notification.priority === "medium"
                                      ? "Sedang"
                                      : "Rendah"}
                                </Badge>
                                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                              </div>

                              <p className="text-gray-600 text-sm mb-2">{notification.message}</p>

                              {notification.employee && (
                                <div className="flex items-center space-x-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={notification.employee.avatar || "/placeholder.svg"}
                                      alt={notification.employee.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {notification.employee.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-500">
                                    {notification.employee.name} - {notification.employee.position}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {notification.employee.division}
                                  </Badge>
                                </div>
                              )}

                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimestamp(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                <Check className="h-4 w-4 mr-2" />
                                Tandai Dibaca
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="high">
              <div className="space-y-4">
                {filteredNotifications
                  .filter((n) => n.priority === "high")
                  .map((notification) => (
                    <Card
                      key={notification.id}
                      className={`hover:shadow-md transition-all ${!notification.isRead ? "bg-red-50 border-red-200" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`font-medium ${!notification.isRead ? "text-red-900" : "text-gray-900"}`}
                                >
                                  {notification.title}
                                </h3>
                                <Badge className="bg-red-100 text-red-800">Tinggi</Badge>
                                {!notification.isRead && <div className="w-2 h-2 bg-red-600 rounded-full" />}
                              </div>

                              <p className="text-gray-600 text-sm mb-2">{notification.message}</p>

                              {notification.employee && (
                                <div className="flex items-center space-x-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={notification.employee.avatar || "/placeholder.svg"}
                                      alt={notification.employee.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {notification.employee.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-500">
                                    {notification.employee.name} - {notification.employee.position}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {notification.employee.division}
                                  </Badge>
                                </div>
                              )}

                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimestamp(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Tandai Dibaca
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="system">
              <div className="space-y-4">
                {filteredNotifications
                  .filter((n) => n.type === "system")
                  .map((notification) => (
                    <Card
                      key={notification.id}
                      className={`hover:shadow-md transition-all ${!notification.isRead ? "bg-blue-50 border-blue-200" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`font-medium ${!notification.isRead ? "text-blue-900" : "text-gray-900"}`}
                                >
                                  {notification.title}
                                </h3>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === "high"
                                    ? "Tinggi"
                                    : notification.priority === "medium"
                                      ? "Sedang"
                                      : "Rendah"}
                                </Badge>
                                {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                              </div>

                              <p className="text-gray-600 text-sm mb-2">{notification.message}</p>

                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimestamp(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Tandai Dibaca
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="stress">
              <div className="space-y-4">
                {filteredNotifications
                  .filter((n) => n.type.startsWith("stress"))
                  .map((notification) => (
                    <Card
                      key={notification.id}
                      className={`hover:shadow-md transition-all ${!notification.isRead ? "bg-orange-50 border-orange-200" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`font-medium ${!notification.isRead ? "text-orange-900" : "text-gray-900"}`}
                                >
                                  {notification.title}
                                </h3>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === "high"
                                    ? "Tinggi"
                                    : notification.priority === "medium"
                                      ? "Sedang"
                                      : "Rendah"}
                                </Badge>
                                {!notification.isRead && <div className="w-2 h-2 bg-orange-600 rounded-full" />}
                              </div>

                              <p className="text-gray-600 text-sm mb-2">{notification.message}</p>

                              {notification.employee && (
                                <div className="flex items-center space-x-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={notification.employee.avatar || "/placeholder.svg"}
                                      alt={notification.employee.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {notification.employee.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-500">
                                    {notification.employee.name} - {notification.employee.position}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {notification.employee.division}
                                  </Badge>
                                </div>
                              )}

                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimestamp(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Tandai Dibaca
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
