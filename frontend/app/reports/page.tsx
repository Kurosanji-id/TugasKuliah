"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText, Users, TrendingUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart } from "@/components/ui/chart"

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Mock data for reports
  const departmentStressData = {
    labels: ["Engineering", "Design", "Marketing", "Sales", "HR"],
    datasets: [
      {
        label: "Rata-rata Tingkat Stress",
        data: [65, 58, 52, 48, 45],
        backgroundColor: [
          "rgba(239, 68, 68, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(34, 197, 94, 0.6)",
        ],
      },
    ],
  }

  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Rata-rata Perusahaan",
        data: [58, 62, 55, 48, 52, 45],
        borderColor: "rgb(124, 58, 237)",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.3,
      },
      {
        label: "Target",
        data: [40, 40, 40, 40, 40, 40],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  }

  const reports = [
    {
      id: 1,
      title: "Laporan Stress Bulanan - Januari 2024",
      type: "monthly",
      department: "Semua Departemen",
      generatedDate: "2024-01-31",
      status: "completed",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      title: "Analisis Departemen Engineering - Q1 2024",
      type: "departmental",
      department: "Engineering",
      generatedDate: "2024-01-28",
      status: "completed",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      title: "Laporan Mingguan - Minggu 4 Januari",
      type: "weekly",
      department: "Semua Departemen",
      generatedDate: "2024-01-28",
      status: "completed",
      fileSize: "1.2 MB",
    },
    {
      id: 4,
      title: "Tren Stress Karyawan - 6 Bulan Terakhir",
      type: "trend",
      department: "Semua Departemen",
      generatedDate: "2024-01-25",
      status: "completed",
      fileSize: "3.1 MB",
    },
  ]

  const summaryStats = {
    totalEmployees: 45,
    averageStress: 52,
    highStressEmployees: 8,
    improvementRate: 15,
  }

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "monthly":
        return "bg-blue-100 text-blue-800"
      case "weekly":
        return "bg-green-100 text-green-800"
      case "departmental":
        return "bg-purple-100 text-purple-800"
      case "trend":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getReportTypeName = (type: string) => {
    switch (type) {
      case "monthly":
        return "Bulanan"
      case "weekly":
        return "Mingguan"
      case "departmental":
        return "Departemen"
      case "trend":
        return "Tren"
      default:
        return "Lainnya"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <Link href="/hr-dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
              <p className="text-gray-600">Analisis dan laporan tingkat stress karyawan</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
              <FileText size={18} />
              Buat Laporan Baru
            </Button>
          </div>
        </header>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Karyawan</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.totalEmployees}</p>
                </div>
                <Users className="text-blue-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rata-rata Stress</p>
                  <p className="text-2xl font-bold text-yellow-600">{summaryStats.averageStress}%</p>
                </div>
                <TrendingUp className="text-yellow-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Stress Tinggi</p>
                  <p className="text-2xl font-bold text-red-600">{summaryStats.highStressEmployees}</p>
                </div>
                <Users className="text-red-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Perbaikan</p>
                  <p className="text-2xl font-bold text-green-600">+{summaryStats.improvementRate}%</p>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Tingkat Stress per Departemen</CardTitle>
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
            <CardHeader>
              <CardTitle>Tren Tingkat Stress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart
                  data={trendData}
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

        {/* Reports List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Daftar Laporan</CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Departemen</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="text-gray-400" size={24} />
                    <div>
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getReportTypeColor(report.type)}>{getReportTypeName(report.type)}</Badge>
                        <span className="text-sm text-gray-500">{report.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-900">
                        {new Date(report.generatedDate).toLocaleDateString("id-ID")}
                      </p>
                      <p className="text-xs text-gray-500">{report.fileSize}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Download size={16} />
                      Unduh
                    </Button>
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
