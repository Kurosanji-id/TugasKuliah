"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (role: "employee" | "hr") => {
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect based on role
    if (role === "employee") {
      router.push("/employee-dashboard")
    } else {
      router.push("/hr-dashboard")
    }

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Beranda
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              EmoCollab
            </h1>
          </div>
          <p className="text-gray-600">Masuk ke platform pemantauan kesehatan mental karyawan</p>
        </div>

        {/* Login Form */}
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Masuk ke Akun</CardTitle>
            <CardDescription>Pilih peran Anda untuk mengakses dashboard yang sesuai</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="employee" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="employee" className="text-sm">
                  Karyawan
                </TabsTrigger>
                <TabsTrigger value="hr" className="text-sm">
                  HRD
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employee" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-email">Email</Label>
                    <Input
                      id="employee-email"
                      name="email"
                      type="email"
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employee-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="employee-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border-purple-200 focus:border-purple-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember-employee"
                        type="checkbox"
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <Label htmlFor="remember-employee" className="text-sm text-gray-600">
                        Ingat saya
                      </Label>
                    </div>
                    <Link href="#" className="text-sm text-purple-600 hover:text-purple-800">
                      Lupa password?
                    </Link>
                  </div>

                  <Button
                    onClick={() => handleLogin("employee")}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isLoading ? "Memproses..." : "Masuk sebagai Karyawan"}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Fitur Dashboard Karyawan:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Emotion Scanner dengan Face API</li>
                    <li>• Riwayat tingkat stres mingguan</li>
                    <li>• Chat konsultasi dengan HRD</li>
                    <li>• Rekomendasi penanganan stres</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="hr" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hr-email">Email</Label>
                    <Input
                      id="hr-email"
                      name="email"
                      type="email"
                      placeholder="hr@perusahaan.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hr-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="hr-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border-orange-200 focus:border-orange-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember-hr"
                        type="checkbox"
                        className="rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                      />
                      <Label htmlFor="remember-hr" className="text-sm text-gray-600">
                        Ingat saya
                      </Label>
                    </div>
                    <Link href="#" className="text-sm text-orange-600 hover:text-orange-800">
                      Lupa password?
                    </Link>
                  </div>

                  <Button
                    onClick={() => handleLogin("hr")}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    {isLoading ? "Memproses..." : "Masuk sebagai HRD"}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">Fitur Dashboard HRD:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Employee Monitoring real-time</li>
                    <li>• Analytics Dashboard per divisi</li>
                    <li>• Smart Messaging dengan karyawan</li>
                    <li>• Peringatan prioritas tinggi</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Access */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">Ingin mencoba tanpa login?</p>
          <Link href="/demo">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent">
              Akses Demo Scan Wajah
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
