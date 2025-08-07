"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MessageSquare, Send, Search, Users, Phone, Video, MoreVertical, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Contact {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "away"
  lastMessage: string
  timestamp: string
  unreadCount: number
  priority?: "high" | "normal" | "low"
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "file" | "image"
}

export default function EmployeeMessages() {
  const [selectedContact, setSelectedContact] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "HR Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Terima kasih atas laporannya. Kami akan segera menindaklanjuti.",
      timestamp: "10:30",
      unreadCount: 2,
      priority: "high",
    },
    {
      id: "2",
      name: "Ahmad Supervisor",
      role: "Team Lead",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Meeting hari ini pukul 14:00, jangan lupa ya!",
      timestamp: "09:15",
      unreadCount: 0,
      priority: "normal",
    },
    {
      id: "3",
      name: "Dewi Lestari",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastMessage: "Bisa bantu review design ini?",
      timestamp: "Kemarin",
      unreadCount: 1,
      priority: "normal",
    },
    {
      id: "4",
      name: "IT Support",
      role: "Technical Support",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Masalah sudah teratasi, silakan dicoba kembali.",
      timestamp: "2 hari lalu",
      unreadCount: 0,
      priority: "low",
    },
    {
      id: "5",
      name: "Budi Santoso",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "Code review sudah selesai, ada beberapa catatan.",
      timestamp: "3 hari lalu",
      unreadCount: 0,
      priority: "normal",
    },
  ]

  const messages: { [key: string]: Message[] } = {
    "1": [
      {
        id: "1",
        senderId: "1",
        content:
          "Halo, bagaimana kabar Anda hari ini? Saya melihat ada beberapa indikator stress yang perlu kita diskusikan.",
        timestamp: "10:25",
        type: "text",
      },
      {
        id: "2",
        senderId: "employee",
        content:
          "Halo Bu Sarah, terima kasih sudah menghubungi. Iya, hari ini memang agak berat dengan deadline project yang menumpuk.",
        timestamp: "10:27",
        type: "text",
      },
      {
        id: "3",
        senderId: "1",
        content:
          "Saya mengerti. Mari kita atur waktu untuk konsultasi lebih lanjut. Apakah Anda bisa meluangkan waktu besok pagi?",
        timestamp: "10:28",
        type: "text",
      },
      {
        id: "4",
        senderId: "1",
        content: "Terima kasih atas laporannya. Kami akan segera menindaklanjuti.",
        timestamp: "10:30",
        type: "text",
      },
    ],
    "2": [
      {
        id: "1",
        senderId: "2",
        content: "Selamat pagi! Jangan lupa meeting tim hari ini pukul 14:00 di ruang meeting A.",
        timestamp: "09:10",
        type: "text",
      },
      {
        id: "2",
        senderId: "employee",
        content: "Siap Pak Ahmad, sudah saya catat. Ada agenda khusus yang perlu saya persiapkan?",
        timestamp: "09:12",
        type: "text",
      },
      {
        id: "3",
        senderId: "2",
        content: "Meeting hari ini pukul 14:00, jangan lupa ya!",
        timestamp: "09:15",
        type: "text",
      },
    ],
    "3": [
      {
        id: "1",
        senderId: "3",
        content: "Hai! Bisa bantu review design untuk fitur baru ini? Butuh feedback dari perspektif developer.",
        timestamp: "Kemarin 15:30",
        type: "text",
      },
      {
        id: "2",
        senderId: "employee",
        content: "Tentu! Kirim aja file designnya, nanti saya review dan kasih feedback.",
        timestamp: "Kemarin 15:45",
        type: "text",
      },
      {
        id: "3",
        senderId: "3",
        content: "Bisa bantu review design ini?",
        timestamp: "Kemarin 16:00",
        type: "text",
      },
    ],
    "4": [
      {
        id: "1",
        senderId: "employee",
        content: "Halo IT Support, saya mengalami masalah dengan akses ke sistem internal. Bisa dibantu?",
        timestamp: "2 hari lalu 11:00",
        type: "text",
      },
      {
        id: "2",
        senderId: "4",
        content: "Halo, saya akan cek sistemnya dulu. Mohon tunggu sebentar ya.",
        timestamp: "2 hari lalu 11:15",
        type: "text",
      },
      {
        id: "3",
        senderId: "4",
        content: "Masalah sudah teratasi, silakan dicoba kembali.",
        timestamp: "2 hari lalu 11:30",
        type: "text",
      },
    ],
    "5": [
      {
        id: "1",
        senderId: "employee",
        content: "Budi, bisa tolong review code untuk fitur authentication?",
        timestamp: "3 hari lalu 14:00",
        type: "text",
      },
      {
        id: "2",
        senderId: "5",
        content: "Oke, nanti sore saya review ya. Kirim link PR-nya.",
        timestamp: "3 hari lalu 14:15",
        type: "text",
      },
      {
        id: "3",
        senderId: "5",
        content: "Code review sudah selesai, ada beberapa catatan.",
        timestamp: "3 hari lalu 16:00",
        type: "text",
      },
    ],
  }

  const quickMessages = [
    "Terima kasih",
    "Baik, akan saya lakukan",
    "Mohon maaf atas keterlambatan",
    "Saya butuh bantuan",
    "Sudah selesai",
    "Akan saya cek dulu",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "HR Manager":
        return "bg-purple-100 text-purple-800"
      case "Team Lead":
        return "bg-blue-100 text-blue-800"
      case "UI/UX Designer":
        return "bg-pink-100 text-pink-800"
      case "Technical Support":
        return "bg-orange-100 text-orange-800"
      case "Software Engineer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "normal":
        return "border-l-blue-500 bg-blue-50"
      case "low":
        return "border-l-gray-500 bg-gray-50"
      default:
        return "border-l-blue-500 bg-blue-50"
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedContactData = contacts.find((c) => c.id === selectedContact)
  const currentMessages = selectedContact ? messages[selectedContact] || [] : []

  const sendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: "employee",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }

      if (!messages[selectedContact]) {
        messages[selectedContact] = []
      }
      messages[selectedContact].push(newMsg)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <header className="mb-6">
          <Link
            href="/employee-dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesan</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageSquare size={16} />
                <span>Mode: Karyawan</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {filteredContacts.filter((c) => c.unreadCount > 0).length} pesan belum dibaca
                </Badge>
              </div>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users size={16} className="mr-2" />
              Kontak Baru
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Contacts List */}
          <Card className="lg:col-span-1 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Kontak</CardTitle>
                <Badge variant="outline">{filteredContacts.length} kontak</Badge>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Cari kontak..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 cursor-pointer transition-all hover:bg-gray-50 border-l-4 ${
                      selectedContact === contact.id
                        ? "bg-blue-50 border-l-blue-500"
                        : getPriorityColor(contact.priority)
                    }`}
                    onClick={() => setSelectedContact(contact.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}
                        ></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{contact.timestamp}</span>
                            {contact.unreadCount > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs px-2 py-1">{contact.unreadCount}</Badge>
                            )}
                          </div>
                        </div>

                        <Badge className={`text-xs mb-2 ${getRoleColor(contact.role)}`}>{contact.role}</Badge>

                        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 shadow-sm flex flex-col">
            {selectedContactData ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={selectedContactData.avatar || "/placeholder.svg"}
                            alt={selectedContactData.name}
                          />
                          <AvatarFallback>{selectedContactData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedContactData.status)}`}
                        ></div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedContactData.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getRoleColor(selectedContactData.role)}`}>
                            {selectedContactData.role}
                          </Badge>
                          <span className="text-xs text-gray-500 capitalize">{selectedContactData.status}</span>
                        </div>
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
                          <DropdownMenuItem>Lihat Profil</DropdownMenuItem>
                          <DropdownMenuItem>Hapus Percakapan</DropdownMenuItem>
                          <DropdownMenuItem>Blokir Kontak</DropdownMenuItem>
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
                        className={`flex ${message.senderId === "employee" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.senderId === "employee" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p
                            className={`text-xs mt-2 ${
                              message.senderId === "employee" ? "text-blue-100" : "text-gray-500"
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
                    {quickMessages.map((msg, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer text-xs"
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
                        placeholder="Ketik pesan..."
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
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-500">Pilih kontak untuk memulai percakapan</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
