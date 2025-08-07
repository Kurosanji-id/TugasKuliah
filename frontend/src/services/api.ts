import axios from "axios"

const API_BASE_URL = "http://localhost:8000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface EmotionScores {
  happy: number
  sad: number
  angry: number
  fearful: number
  disgusted: number
  surprised: number
  neutral: number
}

export interface FaceAnalysisResult {
  success: boolean
  data?: {
    emotions: EmotionScores
    stress_level: number
    confidence: number
    age?: number
    gender?: string
    employee?: {
      id: number
      name: string
      position: string
      division: string
    }
  }
  error?: string
}

export const faceAnalysisAPI = {
  async analyzeImage(imageBlob: Blob): Promise<FaceAnalysisResult> {
    try {
      const formData = new FormData()
      formData.append("image", imageBlob, "face.jpg")

      const response = await api.post("/analyze-face/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    } catch (error) {
      console.error("Face analysis API error:", error)
      throw error
    }
  },

  async getEmployees() {
    try {
      const response = await api.get("/employees/")
      return response.data
    } catch (error) {
      console.error("Get employees error:", error)
      throw error
    }
  },

  async saveScanResult(scanData: any) {
    try {
      const response = await api.post("/scan-results/", scanData)
      return response.data
    } catch (error) {
      console.error("Save scan result error:", error)
      throw error
    }
  },
}

export default api
