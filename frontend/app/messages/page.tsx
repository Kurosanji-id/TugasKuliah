"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Send, Search, MessageSquare, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Messages() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [userRole, setUserRole] = useState<"employee" | "hr">("hr")

  // Get user role from URL params or localStorage
  useEffect(() => {
    const roleFromParams = searchParams.get("role")
    const roleFromStorage = localStorage.getItem("userRole")

    if (roleFromParams === "employee" || roleFromParams === "hr") {
      setUserRole(roleFromParams)
      localStorage.setItem("userRole", roleFromParams)
    } else if (roleFromStorage === "employee" || roleFromStorage === "hr") {
      setUserRole(roleFromStorage)
    } else {
      // Default fallback - try to determine from current path or set default
      setUserRole("hr")
      localStorage.setItem("userRole", "hr")
    }
  }, [searchParams])

  const conversations = [
    {
      id: 1,
      participant: userRole === "hr" ? "Budi Santoso" : "Sarah Johnson (HRD)",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage:
        userRole === "hr"
          ? "Terima kasih atas sarannya, saya akan mencoba istirahat lebih sering."
          : "Coba ambil istirahat 10-15 menit setiap 2 jam. Jangan lupa minum air putih yang cukup.",
      timestamp: "2024-01-15T14:30:00",
      unreadCount: userRole === "hr" ? 0 : 1,
      isOnline: true,
    },
    {
      id: 2,
      participant: userRole === "hr" ? "Dewi Lestari" : "Ahmad Rizki (Supervisor)",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage:
        userRole === "hr"
          ? "Baik, saya akan mengikuti saran untuk melakukan peregangan."
          : "Bagaimana kabar Anda hari ini? Semoga lebih baik.",
      timestamp: "2024-01-15T13:15:00",
      unreadCount: userRole === "hr" ? 2 : 0,
      isOnline: false,
    },
    {
      id: 3,
      participant: userRole === "hr" ? "Ahmad Rizki" : "Dewi Lestari (Designer)",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage:
        userRole === "hr"
          ? "Saya merasa lebih baik setelah mengikuti saran Anda."
          : "Terima kasih sudah mendengarkan keluhan saya kemarin.",
      timestamp: "2024-01-15T11:45:00",
      unreadCount: 0,
      isOnline: true,
    },
  ]

  const messages = {
    1:
      userRole === "hr"
        ? [
            {
              id: 1,
              sender: "hr",
              content: "Halo Budi, saya melihat tingkat stress Anda cukup tinggi hari ini. Bagaimana perasaan Anda?",
              timestamp: "2024-01-15T10:00:00",
              status: "read",
            },
            {
              id: 2,
              sender: "employee",
              content: "Halo Bu Sarah, memang hari ini cukup berat dengan deadline project.",
              timestamp: "2024-01-15T10:05:00",
              status: "read",
            },
            {
              id: 3,
              sender: "hr",
              content:
                "Saya mengerti. Coba ambil istirahat 10-15 menit setiap 2 jam. Jangan lupa untuk minum air putih yang cukup.",
              timestamp: "2024-01-15T10:10:00",
              status: "read",
            },
            {
              id: 4,
              sender: "employee",
              content: "Terima kasih atas sarannya, saya akan mencoba istirahat lebih sering.",
              timestamp: "2024-01-15T14:30:00",
              status: "delivered",
            },
          ]
        : [
            {
              id: 1,
              sender: "hr",
              content: "Halo Budi, saya melihat tingkat stress Anda cukup tinggi hari ini. Bagaimana perasaan Anda?",
              timestamp: "2024-01-15T10:00:00",
              status: "read",
            },
            {
              id: 2,
              sender: "employee",
              content: "Halo Bu Sarah, memang hari ini cukup berat dengan deadline project.",
              timestamp: "2024-01-15T10:05:00",
              status: "read",
            },
            {
              id: 3,
              sender: "hr",
              content:
                "Saya mengerti. Coba ambil istirahat 10-15 menit setiap 2 jam. Jangan lupa untuk minum air putih yang cukup.",
              timestamp: "2024-01-15T10:10:00",
              status: "read",
            },
            {
              id: 4,
              sender: "employee",
              content: "Terima kasih atas sarannya, saya akan mencoba istirahat lebih sering.",
              timestamp: "2024-01-15T14:30:00",
              status: "delivered",
            },
          ],
    2:
      userRole === "hr"
        ? [
            {
              id: 1,
              sender: "hr",
              content: "Dewi, tingkat stress Anda menunjukkan level sedang. Ada yang bisa saya bantu?",
              timestamp: "2024-01-15T09:00:00",
              status: "read",
            },
            {
              id: 2,
              sender: "employee",
              content: "Terima kasih Bu, saya sedang mengerjakan beberapa design yang kompleks.",
              timestamp: "2024-01-15T09:15:00",
              status: "read",
            },
            {
              id: 3,
              sender: "hr",
              content: "Coba lakukan peregangan ringan setiap 30 menit untuk mengurangi ketegangan.",
              timestamp: "2024-01-15T09:20:00",
              status: "read",
            },
            {
              id: 4,
              sender: "employee",
              content: "Baik, saya akan mengikuti saran untuk melakukan peregangan.",
              timestamp: "2024-01-15T13:15:00",
              status: "delivered",
            },
          ]
        : [
            {
              id: 1,
              sender: "supervisor",
              content: "Halo Budi, bagaimana progress project hari ini?",
              timestamp: "2024-01-15T09:00:00",
              status: "read",
            },
            {
              id: 2,
              sender: "employee",
              content: "Halo Pak Ahmad, sudah sekitar 70% selesai. Masih ada beberapa bug yang perlu diperbaiki.",
              timestamp: "2024-01-15T09:15:00",
              status: "read",
            },
            {
              id: 3,
              sender: "supervisor",
              content: "Bagus! Jangan terlalu memaksakan diri ya. Kalau butuh bantuan, langsung bilang.",
              timestamp: "2024-01-15T09:20:00",
              status: "read",
            },
            {
              id: 4,
              sender: "employee",
              content: "Siap Pak, terima kasih atas perhatiannya.",
              timestamp: "2024-01-15T13:15:00",
              status: "delivered",
            },
          ],
    3:
      userRole === "hr"
        ? [
            {
              id: 1,
              sender: "hr",
              content: "Ahmad, bagaimana kabar Anda hari ini? Tingkat stress Anda terlihat membaik.",
              timestamp: "2024-01-15T08:00:00",
              status: "read",
            },
            {
              id: 2,
              sender: "employee",
              content: "Alhamdulillah Bu, saya merasa lebih baik setelah mengikuti saran Anda kemarin.",
              timestamp: "2024-01-15T08:30:00",
              status: "read",
            },
            {
              id: 3,
              sender: "hr",
              content: "Senang mendengarnya! Tetap jaga pola istirahat yang baik ya.",
              timestamp: "2024-01-15T08:35:00",
              status: "read",
            },
            {
              id: 4,
              sender: "employee",
              content: "Saya merasa lebih baik setelah mengikuti saran Anda.",
              timestamp: "2024-01-15T11:45:00",
              status: "delivered",
            },
          ]
        : [
            {
              id: 1,
              sender: "colleague",
              content: "Halo Budi! Gimana kabarnya? Udah lama kita nggak ngobrol.",
              timestamp: "2024-01-15T08:00:00",
              status: "read",
            },
            {
              id: 2,
              sender: "employee",
              content: "Halo Dewi! Alhamdulillah baik, cuma agak sibuk aja akhir-akhir ini.",
              timestamp: "2024-01-15T08:30:00",
              status: "read",
            },
            {
              id: 3,
              sender: "colleague",
              content: "Iya nih, aku juga lagi banyak project. Semangat ya! Kalau butuh bantuan design bilang aja.",
              timestamp: "2024-01-15T08:35:00",
              status: "read",
            },
            {
              id: 4,
              sender: "employee",
              content: "Terima kasih sudah mendengarkan keluhan saya kemarin.",
              timestamp: "2024-01-15T11:45:00",
              status: "delivered",
            },
          ],
  }

  const predefinedMessages =
    userRole === "hr"
      ? [
          "Istirahat 10 menit",
          "Ambil waktu untuk minum kopi/teh",
          "Lakukan peregangan singkat",
          "Jadwalkan konsultasi dengan tim kesehatan",
          "Pertimbangkan untuk pulang lebih awal hari ini",
        ]
      : [
          "Terima kasih atas bantuannya",
          "Saya akan mencoba saran tersebut",
          "Bisa kita diskusi lebih lanjut?",
          "Saya merasa lebih baik sekarang",
          "Mohon maaf merepotkan",
        ]

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Here you would typically send the message to backend
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check size={14} className="text-gray-400" />
      case "delivered":
        return <CheckCheck size={14} className="text-gray-400" />
      case "read":
        return <CheckCheck size={14} className="text-blue-500" />
      default:
        return null
    }
  }

  const handleBackNavigation = () => {
    if (userRole === "employee") {
      router.push("/employee-dashboard")
    } else {
      router.push("/hr-dashboard")
    }
  }

  const getMessageSenderStyle = (sender: string) => {
    if (userRole === "hr") {
      return sender === "hr" ? "justify-end" : "justify-start"
    } else {
      return sender === "employee" ? "justify-end" : "justify-start"
    }
  }

  const getMessageBubbleStyle = (sender: string) => {
    if (userRole === "hr") {
      return sender === "hr" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-900"
    } else {
      return sender === "employee" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <header className="mb-6">
          <button
            onClick={handleBackNavigation}
            className="flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard {userRole === "employee" ? "Karyawan" : "HRD"}
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Pesan</h1>
          <p className="text-gray-600">
            {userRole === "hr" ? "Komunikasi dengan karyawan" : "Komunikasi dengan tim dan HRD"}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Percakapan</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder={userRole === "hr" ? "Cari karyawan..." : "Cari kontak..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                      selectedConversation === conversation.id ? "bg-purple-50 border-l-4 border-l-purple-500" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.participant} />
                          <AvatarFallback>{conversation.participant.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.participant}</h3>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-purple-500 text-white text-xs">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(conversation.timestamp).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={conversations.find((c) => c.id === selectedConversation)?.avatar || "/placeholder.svg"}
                        alt={conversations.find((c) => c.id === selectedConversation)?.participant}
                      />
                      <AvatarFallback>
                        {conversations.find((c) => c.id === selectedConversation)?.participant.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {conversations.find((c) => c.id === selectedConversation)?.participant}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {conversations.find((c) => c.id === selectedConversation)?.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Messages */}
                  <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {messages[selectedConversation as keyof typeof messages]?.map((message) => (
                      <div key={message.id} className={`flex ${getMessageSenderStyle(message.sender)}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${getMessageBubbleStyle(message.sender)}`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={`flex items-center justify-end mt-1 space-x-1 ${
                              (userRole === "hr" && message.sender === "hr") ||
                              (userRole === "employee" && message.sender === "employee")
                                ? "text-white/70"
                                : "text-gray-500"
                            }`}
                          >
                            <span className="text-xs">
                              {new Date(message.timestamp).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {((userRole === "hr" && message.sender === "hr") ||
                              (userRole === "employee" && message.sender === "employee")) &&
                              getMessageStatus(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Messages */}
                  <div className="border-t p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Pesan Cepat:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {predefinedMessages.map((message, index) => (
                        <Badge
                          key={index}
                          className="bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
                          onClick={() => setNewMessage(message)}
                        >
                          {message}
                        </Badge>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Ketik pesan..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[40px] max-h-[120px]"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                          }
                        }}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className={
                          userRole === "hr" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
                        }
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Pilih percakapan untuk mulai mengirim pesan</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
