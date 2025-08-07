"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, TrendingUp, AlertTriangle, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, BarChart } from "@/components/ui/chart"

export default function HRStressAnalytics() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for department stress analytics
  const departmentStressData = {
    labels: ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance"],
    datasets: [
      {
        label: "Rata-rata Tingkat Stress (%)",
        data: [65, 58, 52, 48, 45, 42],
        backgroundColor: [
          "rgba(239, 68, 68, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(124, 58, 237, 0.6)",
          "rgba(16, 185, 129, 0.6)",
        ],
      },
    ],
  }

  const weeklyTrendData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    datasets: [
      {
        label: "Engineering",
        data: [60, 65, 68, 70, 65],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Design",
        data: [55, 58, 60, 62, 58],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.1)",
        tension: 0.3,
      },
      {
        label: "Marketing",
        data: [50, 52, 54, 55, 52],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
    ],
  }

  // Mock employee data with stress details
  const employeeDetails = [
    {
      id: 1,
      name: "Budi Santoso",
      position: "Senior Software Engineer",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
      currentStress: 75,
      avgStress: 68,
      trend: "increasing",
      lastScan: "2024-01-15T14:30:00",
      riskLevel: "high",
      interventionNeeded: true,
    },
    {
      id: 2,
      name: "Dewi Lestari",
      position: "UI/UX Designer",
      department: "Design",
      avatar: "/placeholder.svg?height=40&width=40",
      currentStress: 58,
      avgStress: 55,
      trend: "stable",
      lastScan: "2024-01-15T13:15:00",
      riskLevel: "medium",
      interventionNeeded: false,
    },
    {
      id: 3,
      name: "Ahmad Rizki",
      position: "Project Manager",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
      currentStress: 42,
      avgStress: 45,
      trend: "decreasing",
      lastScan: "2024-01-15T12:00:00",
      riskLevel: "low",
      interventionNeeded: false,
    },
    {
      id: 4,
      name: "Siti Rahayu",
      position: "Marketing Specialist",
      department: "Marketing",
      avatar: "/placeholder.svg?height=40&width=40",
      currentStress: 52,
      avgStress: 50,
      trend: "stable",
      lastScan: "2024-01-15T11:45:00",
      riskLevel: "medium",
      interventionNeeded: false,
    },
    {
      id: 5,
      name: "Andi Pratama",
      position: "Sales Executive",
      department: "Sales",
      avatar: "/placeholder.svg?height=40&width=40",
      currentStress: 48,
      avgStress: 46,
      trend: "stable",
      lastScan: "2024-01-15T10:30:00",
      riskLevel: "low",
      interventionNeeded: false,
    },
  ]

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

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp size={16} className="text-red-500" />
      case "decreasing":
        return <TrendingUp size={16} className="text-green-500 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const filteredEmployees = employeeDetails.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || employee.department.toLowerCase() === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const highRiskEmployees = employeeDetails.filter((emp) => emp.riskLevel === "high").length
  const totalEmployees = employeeDetails.length
  const avgCompanyStress = Math.round(employeeDetails.reduce((sum, emp) => sum + emp.currentStress, 0) / totalEmployees)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <header className="mb-6">
          <Link href="/hr-dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard HRD
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Tingkat Stress</h1>
              <p className="text-gray-600">Analisis mendalam tingkat stress karyawan per departemen</p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download size={18} />
              <span>Export Report</span>
            </Button>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Total Karyawan</p>
                  <p className="text-xl font-bold text-blue-600">{totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-purple-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Rata-rata Stress</p>
                  <p className={`text-xl font-bold ${getStressLevelColor(avgCompanyStress)}`}>{avgCompanyStress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Risiko Tinggi</p>
                  <p className="text-xl font-bold text-red-500">{highRiskEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm text-gray-500">Departemen Sehat</p>
                  <p className="text-xl font-bold text-green-500">3/6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="department">Per Departemen</TabsTrigger>
            <TabsTrigger value="employees">Detail Karyawan</TabsTrigger>
            <TabsTrigger value="insights">Insights & Rekomendasi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Stress per Departemen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BarChart
                      data={departmentStressData}
                      options={{
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

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium">Trend Mingguan</CardTitle>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Mingguan</SelectItem>
                      <SelectItem value="month">Bulanan</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <LineChart
                      data={weeklyTrendData}
                      options={{
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
          </TabsContent>

          <TabsContent value="department">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Analisis per Departemen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Engineering", avg: 65, employees: 8, risk: "high", color: "red" },
                    { name: "Design", avg: 58, employees: 5, risk: "medium", color: "yellow" },
                    { name: "Marketing", avg: 52, employees: 6, risk: "medium", color: "yellow" },
                    { name: "Sales", avg: 48, employees: 7, risk: "low", color: "green" },
                    { name: "HR", avg: 45, employees: 4, risk: "low", color: "green" },
                    { name: "Finance", avg: 42, employees: 5, risk: "low", color: "green" },
                  ].map((dept) => (
                    <Card key={dept.name} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{dept.name}</h3>
                          <Badge className={getRiskLevelColor(dept.risk)}>
                            {dept.risk === "high" ? "Tinggi" : dept.risk === "medium" ? "Sedang" : "Rendah"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Rata-rata Stress:</span>
                            <span className={`font-medium ${getStressLevelColor(dept.avg)}`}>{dept.avg}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Jumlah Karyawan:</span>
                            <span className="font-medium">{dept.employees}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium">Detail Karyawan</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Cari karyawan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Dept</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{employee.name}</h3>
                            {employee.interventionNeeded && <AlertTriangle size={16} className="text-red-500" />}
                          </div>
                          <p className="text-sm text-gray-500">
                            {employee.position} - {employee.department}
                          </p>
                          <p className="text-xs text-gray-400">
                            Scan terakhir: {new Date(employee.lastScan).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Saat Ini</p>
                          <p className={`font-bold ${getStressLevelColor(employee.currentStress)}`}>
                            {employee.currentStress}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Rata-rata</p>
                          <p className="font-medium text-gray-700">{employee.avgStress}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Trend</p>
                          <div className="flex justify-center">{getTrendIcon(employee.trend)}</div>
                        </div>
                        <Badge className={getRiskLevelColor(employee.riskLevel)}>
                          {employee.riskLevel === "high"
                            ? "Tinggi"
                            : employee.riskLevel === "medium"
                              ? "Sedang"
                              : "Rendah"}
                        </Badge>
                        {employee.interventionNeeded && (
                          <Button size="sm" className="bg-red-500 hover:bg-red-600">
                            Intervensi
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Insights Utama</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-medium text-red-900 mb-2">🚨 Perhatian Khusus</h4>
                    <p className="text-sm text-red-700">
                      Departemen Engineering menunjukkan tingkat stress tertinggi (65%). Perlu intervensi segera untuk
                      Budi Santoso.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-medium text-yellow-900 mb-2">📊 Trend Mingguan</h4>
                    <p className="text-sm text-yellow-700">
                      Tingkat stress cenderung meningkat dari Senin ke Jumat di semua departemen. Puncak stress terjadi
                      pada hari Kamis-Jumat.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-green-900 mb-2">✅ Departemen Sehat</h4>
                    <p className="text-sm text-green-700">
                      Sales, HR, dan Finance menunjukkan tingkat stress yang sehat (&lt;50%). Dapat dijadikan benchmark
                      untuk departemen lain.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-900 mb-2">🎯 Pola Kerja</h4>
                    <p className="text-sm text-blue-700">
                      Karyawan dengan beban kerja tinggi menunjukkan korelasi positif dengan tingkat stress. Perlu
                      evaluasi distribusi workload.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Rekomendasi Aksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-red-600">🔥 Prioritas Tinggi</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Konseling individual untuk Budi Santoso</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Review workload departemen Engineering</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Implementasi flexible working hours</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-yellow-600">⚡ Prioritas Sedang</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Workshop stress management untuk semua karyawan</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Evaluasi meeting schedule dan durasi</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Penyediaan ruang relaksasi di kantor</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-green-600">📈 Jangka Panjang</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Program wellness dan mental health</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Pelatihan leadership untuk supervisor</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Sistem reward untuk work-life balance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">📞 Tim Support</h4>
                    <div className="space-y-1 text-sm">
                      <p>• Konselor: Dr. Maya Sari (ext. 101)</p>
                      <p>• Psikolog: Dr. Andi Wijaya (ext. 102)</p>
                      <p>• Employee Assistance Program: ext. 103</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
