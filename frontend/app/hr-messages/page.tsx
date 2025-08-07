"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Search,
  Shield,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Employee {
  id: string
  name: string
  position: string
  department: string
  avatar: string
  stressLevel: "high" | "medium" | "low"
  lastMessage: string
  timestamp: string
  unreadCount: number
  priority: "urgent" | "normal" | "low"
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "file" | "image"
}

export default function HRMessages() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const employees: Employee[] = [
    {
      id: "1",
      name: "Budi Santoso",
      position: "Software Engineer",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
      stressLevel: "high",
      lastMessage: "Terima kasih atas dukungannya, Bu. Saya akan coba terapkan saran yang diberikan.",
      timestamp: "10:45",
      unreadCount: 1,
      priority: "urgent",
    },
    {
      id: "2",
      name: "Dewi Lestari",
      position: "UI/UX Designer",
      department: "Design",
      avatar: "/placeholder.svg?height=40&width=40",
      stressLevel: "medium",
      lastMessage: "Baik Bu, saya akan ambil istirahat sejenak seperti yang disarankan.",
      timestamp: "09:30",
      unreadCount: 0,
      priority: "normal",
    },
    {
      id: "3",
      name: "Ahmad Rizki",
      position: "Project Manager",
      department: "Management",
      avatar: "/placeholder.svg?height=40&width=40",
      stressLevel: "low",
      lastMessage: "Laporan stress level tim sudah saya kirim via email.",
      timestamp: "Kemarin",
      unreadCount: 0,
      priority: "low",
    },
    {
      id: "4",
      name: "Siti Rahayu",
      position: "Marketing Specialist",
      department: "Marketing",
      avatar: "/placeholder.svg?height=40&width=40",
      stressLevel: "medium",
      lastMessage: "Mohon bantuan untuk konsultasi dengan psikolog perusahaan.",
      timestamp: "2 hari lalu",
      unreadCount: 2,
      priority: "normal",
    },
    {
      id: "5",
      name: "Andi Pratama",
      position: "Sales Executive",
      department: "Sales",
      avatar: "/placeholder.svg?height=40&width=40",
      stressLevel: "high",
      lastMessage: "Saya merasa overwhelmed dengan target bulan ini.",
      timestamp: "3 hari lalu",
      unreadCount: 1,
      priority: "urgent",
    },
  ]

  const messages: { [key: string]: Message[] } = {
    "1": [
      {
        id: "1",
        senderId: "hr",
        content: "Halo Budi, saya melihat tingkat stress Anda cukup tinggi hari ini. Bagaimana perasaan Anda saat ini?",
        timestamp: "10:30",
        type: "text",
      },
      {
        id: "2",
        senderId: "1",
        content: "Halo Bu Sarah, iya benar. Saya merasa cukup tertekan dengan deadline project yang menumpuk.",
        timestamp: "10:32",
        type: "text",
      },
      {
        id: "3",
        senderId: "hr",
        content:
          "Saya mengerti. Mari kita atur strategi untuk mengelola beban kerja Anda. Pertama, coba ambil istirahat 15 menit setiap 2 jam.",
        timestamp: "10:35",
        type: "text",
      },
      {
        id: "4",
        senderId: "1",
        content: "Terima kasih atas dukungannya, Bu. Saya akan coba terapkan saran yang diberikan.",
        timestamp: "10:45",
        type: "text",
      },
    ],
    "2": [
      {
        id: "1",
        senderId: "hr",
        content: "Dewi, saya perhatikan ada sedikit peningkatan tingkat stress. Ada yang bisa saya bantu?",
        timestamp: "09:20",
        type: "text",
      },
      {
        id: "2",
        senderId: "2",
        content: "Halo Bu, iya sedikit stress karena revisi design yang berulang-ulang.",
        timestamp: "09:25",
        type: "text",
      },
      {
        id: "3",
        senderId: "2",
        content: "Baik Bu, saya akan ambil istirahat sejenak seperti yang disarankan.",
        timestamp: "09:30",
        type: "text",
      },
    ],
    "3": [
      {
        id: "1",
        senderId: "3",
        content: "Bu Sarah, laporan stress level tim untuk minggu ini sudah saya compile.",
        timestamp: "Kemarin 16:00",
        type: "text",
      },
      {
        id: "2",
        senderId: "hr",
        content: "Terima kasih Ahmad. Bisa tolong kirim via email juga?",
        timestamp: "Kemarin 16:15",
        type: "text",
      },
      {
        id: "3",
        senderId: "3",
        content: "Laporan stress level tim sudah saya kirim via email.",
        timestamp: "Kemarin 16:30",
        type: "text",
      },
    ],
    "4": [
      {
        id: "1",
        senderId: "4",
        content: "Bu Sarah, saya merasa butuh bantuan profesional untuk mengelola stress.",
        timestamp: "2 hari lalu 14:00",
        type: "text",
      },
      {
        id: "2",
        senderId: "hr",
        content: "Tentu Siti, saya akan atur jadwal konsultasi dengan psikolog perusahaan.",
        timestamp: "2 hari lalu 14:15",
        type: "text",
      },
      {
        id: "3",
        senderId: "4",
        content: "Mohon bantuan untuk konsultasi dengan psikolog perusahaan.",
        timestamp: "2 hari lalu 14:30",
        type: "text",
      },
    ],
    "5": [
      {
        id: "1",
        senderId: "5",
        content: "Bu, saya merasa sangat tertekan dengan target penjualan bulan ini.",
        timestamp: "3 hari lalu 11:00",
        type: "text",
      },
      {
        id: "2",
        senderId: "hr",
        content: "Andi, mari kita diskusikan strategi yang lebih realistis untuk mencapai target.",
        timestamp: "3 hari lalu 11:15",
        type: "text",
      },
      {
        id: "3",
        senderId: "5",
        content: "Saya merasa overwhelmed dengan target bulan ini.",
        timestamp: "3 hari lalu 11:30",
        type: "text",
      },
    ],
  }

  const hrQuickMessages = [
    "Ambil istirahat 15 menit",
    "Mari kita jadwalkan konsultasi",
    "Terima kasih atas laporannya",
    "Saya akan bantu mencarikan solusi",
    "Jangan ragu untuk menghubungi saya",
    "Mari kita diskusikan lebih lanjut",
  ]

  const getStressLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Engineering":
        return "bg-blue-100 text-blue-800"
      case "Design":
        return "bg-pink-100 text-pink-800"
      case "Management":
        return "bg-purple-100 text-purple-800"
      case "Marketing":
        return "bg-orange-100 text-orange-800"
      case "Sales":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500 bg-red-50"
      case "normal":
        return "border-l-purple-500 bg-purple-50"
      case "low":
        return "border-l-gray-500 bg-gray-50"
      default:
        return "border-l-purple-500 bg-purple-50"
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedEmployeeData = employees.find((e) => e.id === selectedEmployee)
  const currentMessages = selectedEmployee ? messages[selectedEmployee] || [] : []

  const sendMessage = () => {
    if (newMessage.trim() && selectedEmployee) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: "hr",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }

      if (!messages[selectedEmployee]) {
        messages[selectedEmployee] = []
      }
      messages[selectedEmployee].push(newMsg)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <header className="mb-6">
          <Link
            href="/hr-dashboard"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard HRD
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesan HRD</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} />
                <span>Mode: Human Resources</span>
                <Badge className="bg-purple-100 text-purple-800">
                  {filteredEmployees.filter((e) => e.unreadCount > 0).length} pesan belum dibaca
                </Badge>
                <Badge className="bg-red-100 text-red-800">
                  {filteredEmployees.filter((e) => e.priority === "urgent").length} prioritas tinggi
                </Badge>
              </div>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700">
              <AlertTriangle size={16} className="mr-2" />
              Kirim Peringatan
            </Button>
          </div>
        </header>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              Semua ({filteredEmployees.length})
            </TabsTrigger>
            <TabsTrigger value="urgent" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
              Prioritas Tinggi ({filteredEmployees.filter((e) => e.priority === "urgent").length})
            </TabsTrigger>
            <TabsTrigger
              value="high-stress"
              className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
            >
              Stress Tinggi ({filteredEmployees.filter((e) => e.stressLevel === "high").length})
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              Belum Dibaca ({filteredEmployees.filter((e) => e.unreadCount > 0).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
              {/* Employee List */}
              <Card className="lg:col-span-1 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Karyawan</CardTitle>
                    <Badge variant="outline">{filteredEmployees.length} karyawan</Badge>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Cari karyawan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="space-y-1 max-h-[500px] overflow-y-auto">
                    {filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className={`p-4 cursor-pointer transition-all hover:bg-gray-50 border-l-4 ${
                          selectedEmployee === employee.id
                            ? "bg-purple-50 border-l-purple-500"
                            : getPriorityColor(employee.priority)
                        }`}
                        onClick={() => setSelectedEmployee(employee.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900 truncate">{employee.name}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{employee.timestamp}</span>
                                {employee.unreadCount > 0 && (
                                  <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                                    {employee.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={`text-xs ${getDepartmentColor(employee.department)}`}>
                                {employee.department}
                              </Badge>
                              <Badge className={`text-xs ${getStressLevelColor(employee.stressLevel)}`}>
                                {employee.stressLevel === "high"
                                  ? "Stress Tinggi"
                                  : employee.stressLevel === "medium"
                                    ? "Stress Sedang"
                                    : "Stress Rendah"}
                              </Badge>
                            </div>

                            <p className="text-xs text-gray-600 mb-1">{employee.position}</p>
                            <p className="text-sm text-gray-600 truncate">{employee.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2 shadow-sm flex flex-col">
                {selectedEmployeeData ? (
                  <>
                    {/* Chat Header */}
                    <CardHeader className="border-b bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={selectedEmployeeData.avatar || "/placeholder.svg"}
                              alt={selectedEmployeeData.name}
                            />
                            <AvatarFallback>{selectedEmployeeData.name.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div>
                            <h3 className="font-semibold text-gray-900">{selectedEmployeeData.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${getDepartmentColor(selectedEmployeeData.department)}`}>
                                {selectedEmployeeData.department}
                              </Badge>
                              <Badge className={`text-xs ${getStressLevelColor(selectedEmployeeData.stressLevel)}`}>
                                {selectedEmployeeData.stressLevel === "high"
                                  ? "Stress Tinggi"
                                  : selectedEmployeeData.stressLevel === "medium"
                                    ? "Stress Sedang"
                                    : "Stress Rendah"}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500">{selectedEmployeeData.position}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone size={16} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Video size={16} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Lihat Profil Karyawan</DropdownMenuItem>
                              <DropdownMenuItem>Lihat Riwayat Stress</DropdownMenuItem>
                              <DropdownMenuItem>Jadwalkan Konsultasi</DropdownMenuItem>
                              <DropdownMenuItem>Kirim ke Psikolog</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 p-4 overflow-y-auto bg-gray-50">
                      <div className="space-y-4">
                        {currentMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === "hr" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.senderId === "hr" ? "bg-purple-600 text-white" : "bg-white text-gray-900 border"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <p
                                className={`text-xs mt-2 ${
                                  message.senderId === "hr" ? "text-purple-100" : "text-gray-500"
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Quick Messages */}
                    <div className="px-4 py-2 border-t bg-white">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {hrQuickMessages.map((msg, index) => (
                          <Badge
                            key={index}
                            className="bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer text-xs"
                            onClick={() => setNewMessage(msg)}
                          >
                            {msg}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t bg-white">
                      <div className="flex items-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Paperclip size={16} />
                        </Button>

                        <div className="flex-1">
                          <Textarea
                            placeholder="Ketik pesan dukungan..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="min-h-[40px] max-h-[120px] resize-none bg-white"
                            rows={1}
                          />
                        </div>

                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Send size={16} />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-500">Pilih karyawan untuk memulai percakapan</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Other tab contents would be similar but filtered */}
          <TabsContent value="urgent">
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
              <p className="text-gray-600">Menampilkan karyawan dengan prioritas tinggi</p>
            </div>
          </TabsContent>

          <TabsContent value="high-stress">
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
              <p className="text-gray-600">Menampilkan karyawan dengan tingkat stress tinggi</p>
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="text-center py-8">
              <MessageSquare className="mx-auto mb-4 text-purple-500" size={48} />
              <p className="text-gray-600">Menampilkan pesan yang belum dibaca</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
