"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, BarChart3, MessageSquare, Users, Shield, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EmoCollab
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  Masuk
                </Button>
              </Link>
              <Link href="/demo">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Demo Scan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Platform Pemantauan{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Kesehatan Mental
            </span>{" "}
            Karyawan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            EmoCollab menggunakan teknologi pengenalan wajah untuk melacak tingkat stres secara real-time melalui
            analisis ekspresi wajah, menciptakan lingkungan kerja yang lebih sehat dan produktif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg"
              >
                Mulai Sekarang
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg bg-transparent"
              >
                Demo Scan Wajah
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fitur Utama EmoCollab</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Solusi komprehensif untuk pemantauan dan manajemen kesehatan mental karyawan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Employee Features */}
            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Emotion Scanner</CardTitle>
                <CardDescription>
                  Deteksi otomatis tingkat stres melalui analisis ekspresi wajah dengan teknologi Face API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Aktivasi kamera otomatis saat login</li>
                  <li>• Klasifikasi stres: rendah, sedang, tinggi</li>
                  <li>• Visualisasi progress bar real-time</li>
                  <li>• Popup pesan otomatis dari HRD</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Stress History</CardTitle>
                <CardDescription>
                  Grafik mingguan dan tabel rinci variasi tingkat stres per jam dengan saran penanganan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Grafik tren mingguan</li>
                  <li>• Data historis per jam</li>
                  <li>• Rekomendasi penanganan</li>
                  <li>• Export laporan PDF</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Konsultasi HR</CardTitle>
                <CardDescription>
                  Komunikasi pribadi dengan tim HRD melalui chat dua arah seperti WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Chat real-time dengan HRD</li>
                  <li>• Interface mirip WhatsApp</li>
                  <li>• Riwayat percakapan tersimpan</li>
                  <li>• Notifikasi instan</li>
                </ul>
              </CardContent>
            </Card>

            {/* HR Features */}
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Employee Monitoring</CardTitle>
                <CardDescription>
                  Pemantauan real-time kondisi karyawan dengan indikator visual berwarna
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Daftar karyawan real-time</li>
                  <li>• Indikator warna (hijau/kuning/merah)</li>
                  <li>• Peringatan prioritas tinggi</li>
                  <li>• Filter berdasarkan divisi</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Smart Messaging</CardTitle>
                <CardDescription>
                  Chat individual dengan riwayat percakapan terorganisir untuk intervensi cepat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Chat individual terorganisir</li>
                  <li>• Template pesan cepat</li>
                  <li>• Status baca/terkirim</li>
                  <li>• Prioritas berdasarkan stres</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Analytics Dashboard</CardTitle>
                <CardDescription>
                  Analisis tren stres per divisi dan grafik perkembangan untuk evaluasi kebijakan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tren stres per divisi</li>
                  <li>• Grafik perkembangan mingguan</li>
                  <li>• Evaluasi kebijakan perusahaan</li>
                  <li>• Laporan komprehensif</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Teknologi Terdepan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dibangun dengan framework modern dan teknologi AI terpercaya
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">FaceAPI.js</h3>
              <p className="text-sm text-gray-600">Analisis ekspresi wajah real-time</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Chart.js</h3>
              <p className="text-sm text-gray-600">Visualisasi data interaktif</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
              <p className="text-sm text-gray-600">Interface responsif modern</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time</h3>
              <p className="text-sm text-gray-600">Notifikasi dan intervensi instan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Meningkatkan Kesehatan Mental Tim Anda?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Bergabunglah dengan perusahaan-perusahaan yang telah mempercayai EmoCollab untuk menciptakan lingkungan
            kerja yang lebih sehat dan produktif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Mulai Gratis Sekarang
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
              >
                Coba Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">EmoCollab</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Platform pemantauan kesehatan mental karyawan dengan teknologi AI terdepan.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Fitur</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Emotion Scanner</li>
                <li>Stress History</li>
                <li>Employee Monitoring</li>
                <li>Smart Messaging</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dokumentasi</li>
                <li>Tutorial</li>
                <li>Kontak Support</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EmoCollab. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
