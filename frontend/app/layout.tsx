import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/ui/theme-provider"
// Import the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EmoCollab - Aplikasi Deteksi Tingkat Stress Karyawan",
  description: "Aplikasi untuk mendeteksi dan mengelola tingkat stress karyawan melalui ekspresi wajah",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
