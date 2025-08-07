"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function HRProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    position: "HR Manager",
    department: "Human Resources",
    email: "sarah.johnson@emocollab.com",
    phone: "+62 812-3456-7890",
    address: "Jakarta, Indonesia",
    joinDate: "2020-03-15",
    bio: "Berpengalaman dalam manajemen SDM selama 8 tahun dengan fokus pada kesejahteraan karyawan dan pengembangan organisasi.",
    avatar: "/placeholder.svg?height=120&width=120",
    employeeCount: 45,
    departmentCount: 5,
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <Link href="/hr-dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Profil HRD</h1>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
                <Edit className="mr-2" size={16} />
                Edit Profil
              </Button>
            ) : (
              <div className="space-x-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="mr-2" size={16} />
                  Simpan
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="mr-2" size={16} />
                  Batal
                </Button>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              {!isEditing ? (
                <>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <p className="text-gray-600">{profile.position}</p>
                  <p className="text-sm text-gray-500">{profile.department}</p>
                </>
              ) : (
                <div className="space-y-3">
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Nama Lengkap"
                  />
                  <Input
                    value={profile.position}
                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    placeholder="Posisi"
                  />
                  <Input
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    placeholder="Departemen"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{profile.employeeCount}</p>
                    <p className="text-sm text-gray-600">Karyawan</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{profile.departmentCount}</p>
                    <p className="text-sm text-gray-600">Departemen</p>
                  </div>
                </div>
                <Badge className="w-full justify-center bg-green-100 text-green-800">Status: Aktif</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informasi Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Mail className="mr-2" size={16} />
                      Email
                    </Label>
                    {!isEditing ? (
                      <p className="text-gray-900">{profile.email}</p>
                    ) : (
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    )}
                  </div>

                  <div>
                    <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Phone className="mr-2" size={16} />
                      Telepon
                    </Label>
                    {!isEditing ? (
                      <p className="text-gray-900">{profile.phone}</p>
                    ) : (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    )}
                  </div>

                  <div>
                    <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="mr-2" size={16} />
                      Alamat
                    </Label>
                    {!isEditing ? (
                      <p className="text-gray-900">{profile.address}</p>
                    ) : (
                      <Input
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="mr-2" size={16} />
                      Tanggal Bergabung
                    </Label>
                    {!isEditing ? (
                      <p className="text-gray-900">{new Date(profile.joinDate).toLocaleDateString("id-ID")}</p>
                    ) : (
                      <Input
                        type="date"
                        value={profile.joinDate}
                        onChange={(e) => setProfile({ ...profile, joinDate: e.target.value })}
                      />
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Bio</Label>
                    {!isEditing ? (
                      <p className="text-gray-900 text-sm leading-relaxed">{profile.bio}</p>
                    ) : (
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ringkasan Aktivitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">Pesan Terkirim</h3>
                <p className="text-2xl font-bold text-purple-600">127</p>
                <p className="text-sm text-purple-600">Bulan ini</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Notifikasi</h3>
                <p className="text-2xl font-bold text-blue-600">43</p>
                <p className="text-sm text-blue-600">Minggu ini</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Laporan</h3>
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-green-600">Bulan ini</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800">Karyawan Aktif</h3>
                <p className="text-2xl font-bold text-yellow-600">42</p>
                <p className="text-sm text-yellow-600">Hari ini</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
