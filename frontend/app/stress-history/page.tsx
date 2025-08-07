"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, Activity, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart } from "@/components/ui/chart"

export default function StressHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [userRole, setUserRole] = useState<"employee" | "hr">("employee")

  // Mock data for stress history
  const weeklyData = {
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

  const monthlyData = {
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

  const hourlyData = {
    labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    datasets: [
      {
        label: "Tingkat Stress Hari Ini",
        data: [35, 42, 48, 55, 45, 62, 68, 75, 70],
        backgroundColor: [
          "rgba(34, 197, 94, 0.6)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(239, 68, 68, 0.6)",
        ],
      },
    ],
  }

  const stressRecords = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      level: 75,
      category: "Tinggi",
      trigger: "Deadline project",
      duration: "2 jam",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "10:15",
      level: 55,
      category: "Sedang",
      trigger: "Meeting panjang",
      duration: "1 jam",
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "16:45",
      level: 68,
      category: "Tinggi",
      trigger: "Presentasi klien",
      duration: "1.5 jam",
    },
    {
      id: 4,
      date: "2024-01-14",
      time: "11:20",
      level: 42,
      category: "Rendah",
      trigger: "Kerja normal",
      duration: "30 menit",
    },
    {
      id: 5,
      date: "2024-01-13",
      time: "15:10",
      level: 60,
      category: "Sedang",
      trigger: "Review kode",
      duration: "45 menit",
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

  const calculateStats = () => {
    const levels = stressRecords.map((record) => record.level)
    const average = levels.reduce((sum, level) => sum + level, 0) / levels.length
    const highest = Math.max(...levels)
    const lowest = Math.min(...levels)
    const trend = levels[0] > levels[levels.length - 1] ? "down" : "up"

    return { average, highest, lowest, trend }
  }

  const stats = calculateStats()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <Link
            href={userRole === "employee" ? "/employee-dashboard" : "/hr-dashboard"}
            className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
          >
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Riwayat Tingkat Stress</h1>
              <p className="text-gray-600">Analisis perkembangan tingkat stress Anda</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download size={18} />
              Ekspor Data
            </Button>
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rata-rata</p>
                  <p className={`text-2xl font-bold ${getStressLevelColor(stats.average)}`}>
                    {Math.round(stats.average)}%
                  </p>
                </div>
                <Activity className="text-purple-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tertinggi</p>
                  <p className={`text-2xl font-bold ${getStressLevelColor(stats.highest)}`}>{stats.highest}%</p>
                </div>
                <TrendingUp className="text-red-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Terendah</p>
                  <p className={`text-2xl font-bold ${getStressLevelColor(stats.lowest)}`}>{stats.lowest}%</p>
                </div>
                <TrendingDown className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tren</p>
                  <p className={`text-2xl font-bold ${stats.trend === "up" ? "text-red-600" : "text-green-600"}`}>
                    {stats.trend === "up" ? "Naik" : "Turun"}
                  </p>
                </div>
                {stats.trend === "up" ? (
                  <TrendingUp className="text-red-500" size={24} />
                ) : (
                  <TrendingDown className="text-green-500" size={24} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="week" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Mingguan</TabsTrigger>
            <TabsTrigger value="month">Bulanan</TabsTrigger>
            <TabsTrigger value="today">Hari Ini</TabsTrigger>
          </TabsList>

          <TabsContent value="week">
            <Card>
              <CardHeader>
                <CardTitle>Tingkat Stress Mingguan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <LineChart
                    data={weeklyData}
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
          </TabsContent>

          <TabsContent value="month">
            <Card>
              <CardHeader>
                <CardTitle>Rata-rata Tingkat Stress Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <LineChart
                    data={monthlyData}
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
          </TabsContent>

          <TabsContent value="today">
            <Card>
              <CardHeader>
                <CardTitle>Tingkat Stress Hari Ini (Per Jam)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <BarChart
                    data={hourlyData}
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
          </TabsContent>
        </Tabs>

        {/* Detailed Records */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Catatan Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stressRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString("id-ID")}</p>
                      <p className="text-xs text-gray-500">{record.time}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-16">
                        <Progress value={record.level} className="h-2" />
                      </div>
                      <Badge className={getStressLevelBg(record.level)}>{record.category}</Badge>
                      <span className={`font-bold ${getStressLevelColor(record.level)}`}>{record.level}%</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">{record.trigger}</p>
                    <p className="text-xs text-gray-500">Durasi: {record.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
