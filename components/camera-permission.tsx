"use client"

import { useState, useEffect } from "react"
import { Camera, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CameraPermissionProps {
  onPermissionGranted: () => void
  onPermissionDenied: (error: string) => void
}

export function CameraPermission({ onPermissionGranted, onPermissionDenied }: CameraPermissionProps) {
  const [permissionState, setPermissionState] = useState<"unknown" | "granted" | "denied" | "requesting">("unknown")

  useEffect(() => {
    checkPermission()
  }, [])

  const checkPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "camera" as PermissionName })
      setPermissionState(result.state as any)

      if (result.state === "granted") {
        onPermissionGranted()
      }
    } catch (error) {
      // Fallback for browsers that don't support permissions API
      setPermissionState("unknown")
    }
  }

  const requestPermission = async () => {
    setPermissionState("requesting")

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })

      // Stop the stream immediately as we just needed to request permission
      stream.getTracks().forEach((track) => track.stop())

      setPermissionState("granted")
      onPermissionGranted()
    } catch (error) {
      setPermissionState("denied")
      onPermissionDenied("Akses kamera ditolak. Silakan berikan izin kamera untuk menggunakan fitur scan wajah.")
    }
  }

  if (permissionState === "granted") {
    return null
  }

  return (
    <div className="text-center p-6">
      {permissionState === "denied" && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Akses Kamera Diperlukan</AlertTitle>
          <AlertDescription className="text-red-700">
            Untuk menggunakan fitur scan wajah, aplikasi memerlukan akses ke kamera Anda. Silakan berikan izin kamera
            dan muat ulang halaman.
          </AlertDescription>
        </Alert>
      )}

      {permissionState === "unknown" && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Camera className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Izin Kamera Diperlukan</AlertTitle>
          <AlertDescription className="text-blue-700">
            Aplikasi memerlukan akses kamera untuk melakukan scan wajah dan analisis tingkat stress.
          </AlertDescription>
        </Alert>
      )}

      <Camera size={64} className="mx-auto mb-4 text-gray-400" />
      <h3 className="text-lg font-semibold mb-2">Akses Kamera</h3>
      <p className="text-gray-600 mb-6">Klik tombol di bawah untuk memberikan izin akses kamera</p>

      <Button
        onClick={requestPermission}
        disabled={permissionState === "requesting"}
        className="bg-purple-600 hover:bg-purple-700"
      >
        {permissionState === "requesting" ? "Meminta Izin..." : "Berikan Izin Kamera"}
      </Button>
    </div>
  )
}
