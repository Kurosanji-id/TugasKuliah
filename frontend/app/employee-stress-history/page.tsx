"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, Activity, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart } from "@/components/ui/chart"

export default function EmployeeStressHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock data for stress history
  const weeklyStressData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Tingkat Stress",
        data: [45, 55, 60, 68, 75, 40, 35],
        borderColor: "rgb(124, 58, 237)",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const monthlyStressData = {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    datasets: [
      {
        label: "Rata-rata Tingkat Stress",
        data: [52, 58, 65, 48],
        borderColor: "rgb(124, 58, 237)",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const stressDistributionData = {
    labels: ["Rendah", "Sedang", "Tinggi"],
    datasets: [
      {
        label: "Jumlah Hari",
        data: [8, 12, 10],
        backgroundColor: ["rgba(34, 197, 94, 0.6)", "rgba(234, 179, 8, 0.6)", "rgba(239, 68, 68, 0.6)"],
      },
    ],
  }

  // Mock detailed history data
  const detailedHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      stressLevel: 75,
      category: "Tinggi",
      trigger: "Deadline project",
      duration: "2 jam",
      recommendation: "Istirahat 15 menit, teknik pernapasan",
      status: "Ditangani",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "10:15",
      stressLevel: 60,
      category: "Sedang",
      trigger: "Meeting dengan klien",
      duration: "1 jam",
      recommendation: "Peregangan ringan",
      status: "Selesai",
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "16:45",
      stressLevel: 45,
      category: "Rendah",
      trigger: "Tugas rutin",
      duration: "30 menit",
      recommendation: "Lanjutkan aktivitas normal",
      status: "Normal",
    },
    {
      id: 4,
      date: "2024-01-14",
      time: "11:20",
      stressLevel: 68,
      category: "Sedang",
      trigger: "Presentasi tim",
      duration: "1.5 jam",
      recommendation: "Minum air putih, istirahat sejenak",
      status: "Ditangani",
    },
    {
      id: 5,
      date: "2024-01-13",
      time: "09:30",
      stressLevel: 55,
      category: "Sedang",
      trigger: "Email urgent",
      duration: "45 menit",
      recommendation: "Prioritaskan tugas",
      status: "Selesai",
    },
  ]

  const getStressLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "rendah":
        return "bg-green-100 text-green-800"
      case "sedang":
        return "bg-yellow-100 text-yellow-800"
      case "tinggi":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "selesai":
        return "bg-blue-100 text-blue-800"
      case "ditangani":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredHistory = detailedHistory.filter((item) => {
    if (selectedFilter === "all") return true
    return item.category.toLowerCase() === selectedFilter
  })

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case "month":
        return monthlyStressData
      default:
        return weeklyStressData
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <header className="mb-6">
          <Link href="/employee-dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Riwayat Tingkat Stress</h1>
              <p className="text-gray-600">Pantau perkembangan tingkat stress Anda dari waktu ke waktu</p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download size={18} />
              <span>Export Data</span>
            </Button>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="text-purple-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Rata-rata Minggu Ini</p>
                  <p className="text-xl font-bold text-purple-600">58%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-red-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Tertinggi</p>
                  <p className="text-xl font-bold text-red-500">75%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Terendah</p>
                  <p className="text-xl font-bold text-green-500">35%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Hari Dipantau</p>
                  <p className="text-xl font-bold text-blue-500">30</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chart" className="space-y-6">
          <TabsList>
            <TabsTrigger value="chart">Grafik Trend</TabsTrigger>
            <TabsTrigger value="detail">Detail Riwayat</TabsTrigger>
            <TabsTrigger value="insight">Insight Mingguan</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium">Trend Tingkat Stress</CardTitle>
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
                      data={getCurrentData()}
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
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Distribusi Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BarChart
                      data={stressDistributionData}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: "Jumlah Hari",
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

          <TabsContent value="detail">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium">Detail Riwayat Stress</CardTitle>
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-500" />
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="tinggi">Tinggi</SelectItem>
                      <SelectItem value="sedang">Sedang</SelectItem>
                      <SelectItem value="rendah">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Tanggal & Waktu</th>
                        <th className="text-left p-3">Level Stress</th>
                        <th className="text-left p-3">Pemicu</th>
                        <th className="text-left p-3">Durasi</th>
                        <th className="text-left p-3">Rekomendasi</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{item.date}</p>
                              <p className="text-sm text-gray-500">{item.time}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <Badge className={getStressLevelColor(item.category)}>{item.category}</Badge>
                              <span className="text-sm text-gray-600">{item.stressLevel}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <p className="text-sm">{item.trigger}</p>
                          </td>
                          <td className="p-3">
                            <p className="text-sm">{item.duration}</p>
                          </td>
                          <td className="p-3">
                            <p className="text-sm text-gray-600">{item.recommendation}</p>
                          </td>
                          <td className="p-3">
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insight">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Pola Stress Mingguan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">📈 Trend Naik</h4>
                    <p className="text-sm text-blue-700">
                      Tingkat stress Anda cenderung meningkat dari Senin hingga Jumat, dengan puncak pada hari Jumat
                      (75%).
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">⚠️ Pemicu Utama</h4>
                    <p className="text-sm text-yellow-700">
                      Deadline project dan meeting dengan klien adalah pemicu stress terbesar Anda minggu ini.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">✅ Waktu Optimal</h4>
                    <p className="text-sm text-green-700">
                      Akhir pekan menunjukkan tingkat stress terendah. Manfaatkan waktu ini untuk recovery.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Rekomendasi Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">🎯 Tips Manajemen Stress</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>Jadwalkan break 15 menit setiap 2 jam kerja</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>Lakukan teknik pernapasan 4-7-8 saat stress tinggi</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>Persiapkan agenda meeting untuk mengurangi kecemasan</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>Gunakan teknik time-blocking untuk deadline project</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">📞 Butuh Bantuan?</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Jika tingkat stress Anda terus tinggi, jangan ragu untuk menghubungi:
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>• HRD: Sarah Johnson</p>
                      <p>• Konselor: Dr. Maya Sari</p>
                      <p>• Supervisor: Ahmad Rizki</p>
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
