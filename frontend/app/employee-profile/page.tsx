"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Budi Santoso",
    position: "Software Engineer",
    department: "Engineering",
    email: "budi.santoso@emocollab.com",
    phone: "+62 812-9876-5432",
    address: "Jakarta, Indonesia",
    joinDate: "2022-01-15",
    bio: "Software Engineer dengan pengalaman 5 tahun dalam pengembangan aplikasi web dan mobile. Passionate tentang teknologi terbaru dan pengembangan tim.",
    avatar: "/placeholder.svg?height=120&width=120",
    employeeId: "EMP001",
    manager: "Sarah Johnson",
    workLocation: "Jakarta Office",
  })

  const stressStats = {
    currentLevel: 65,
    weeklyAverage: 58,
    monthlyAverage: 52,
    totalScans: 156,
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <Link href="/employee-dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Profil Karyawan</h1>
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
                  <Badge className="mt-2 bg-blue-100 text-blue-800">ID: {profile.employeeId}</Badge>
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
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tingkat Stress Saat Ini</p>
                  <p className={`text-2xl font-bold ${getStressLevelColor(stressStats.currentLevel)}`}>
                    {getStressLevelText(stressStats.currentLevel)}
                  </p>
                  <Progress value={stressStats.currentLevel} className="mt-2" />
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
                    <p className="text-gray-900">{new Date(profile.joinDate).toLocaleDateString("id-ID")}</p>
                  </div>

                  <div>
                    <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="mr-2" size={16} />
                      Manager
                    </Label>
                    <p className="text-gray-900">{profile.manager}</p>
                  </div>

                  <div>
                    <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="mr-2" size={16} />
                      Lokasi Kerja
                    </Label>
                    <p className="text-gray-900">{profile.workLocation}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
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
            </CardContent>
          </Card>
        </div>

        {/* Stress Statistics */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Statistik Tingkat Stress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">Level Saat Ini</h3>
                <p className={`text-2xl font-bold ${getStressLevelColor(stressStats.currentLevel)}`}>
                  {stressStats.currentLevel}%
                </p>
                <p className="text-sm text-purple-600">{getStressLevelText(stressStats.currentLevel)}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Rata-rata Mingguan</h3>
                <p className={`text-2xl font-bold ${getStressLevelColor(stressStats.weeklyAverage)}`}>
                  {stressStats.weeklyAverage}%
                </p>
                <p className="text-sm text-blue-600">{getStressLevelText(stressStats.weeklyAverage)}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Rata-rata Bulanan</h3>
                <p className={`text-2xl font-bold ${getStressLevelColor(stressStats.monthlyAverage)}`}>
                  {stressStats.monthlyAverage}%
                </p>
                <p className="text-sm text-green-600">{getStressLevelText(stressStats.monthlyAverage)}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800">Total Scan</h3>
                <p className="text-2xl font-bold text-yellow-600">{stressStats.totalScans}</p>
                <p className="text-sm text-yellow-600">Kali scan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
