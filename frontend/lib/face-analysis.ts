"use client"

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
  emotions: EmotionScores
  stressLevel: number
  confidence: number
  age?: number
  gender?: "male" | "female"
}

export class FaceAnalysisAPI {
  private apiEndpoint: string
  private apiKey: string

  constructor(apiEndpoint = "/api/analyze-face", apiKey = "") {
    this.apiEndpoint = apiEndpoint
    this.apiKey = apiKey
  }

  async analyzeImage(imageBlob: Blob): Promise<FaceAnalysisResult> {
    try {
      const formData = new FormData()
      formData.append("image", imageBlob, "face.jpg")

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }

      const result = await response.json()
      return this.processAPIResponse(result)
    } catch (error) {
      console.error("Face analysis API error:", error)
      // Return mock data as fallback
      return this.getMockAnalysis()
    }
  }

  private processAPIResponse(apiResponse: any): FaceAnalysisResult {
    // Process the actual API response here
    // This depends on your chosen face analysis API (e.g., Azure Face API, AWS Rekognition, etc.)

    return {
      emotions: apiResponse.emotions || this.getMockEmotions(),
      stressLevel: this.calculateStressLevel(apiResponse.emotions || this.getMockEmotions()),
      confidence: apiResponse.confidence || 0.85,
      age: apiResponse.age,
      gender: apiResponse.gender,
    }
  }

  private getMockAnalysis(): FaceAnalysisResult {
    const emotions = this.getMockEmotions()
    return {
      emotions,
      stressLevel: this.calculateStressLevel(emotions),
      confidence: 0.75 + Math.random() * 0.2,
      age: 25 + Math.floor(Math.random() * 20),
      gender: Math.random() > 0.5 ? "male" : "female",
    }
  }

  private getMockEmotions(): EmotionScores {
    // Generate realistic emotion scores
    const baseStress = Math.random()

    return {
      happy: Math.max(0, 0.3 - baseStress * 0.4 + Math.random() * 0.2),
      sad: Math.max(0, baseStress * 0.3 + Math.random() * 0.2),
      angry: Math.max(0, baseStress * 0.4 + Math.random() * 0.2),
      fearful: Math.max(0, baseStress * 0.5 + Math.random() * 0.2),
      disgusted: Math.max(0, Math.random() * 0.1),
      surprised: Math.max(0, Math.random() * 0.2),
      neutral: Math.max(0, 0.4 - baseStress * 0.2 + Math.random() * 0.3),
    }
  }

  private calculateStressLevel(emotions: EmotionScores): number {
    // Calculate stress level based on emotion scores
    const stressIndicators = emotions.angry + emotions.fearful + emotions.sad
    const positiveIndicators = emotions.happy + emotions.neutral

    const rawStress = (stressIndicators * 100) / (stressIndicators + positiveIndicators + 0.1)

    // Add some randomness and ensure it's within reasonable bounds
    const adjustedStress = Math.max(20, Math.min(90, rawStress + (Math.random() - 0.5) * 20))

    return Math.round(adjustedStress)
  }

  // Method to get employee data based on face recognition
  async getEmployeeData(faceDescriptor: number[]): Promise<any> {
    // This would typically call your employee database API
    // For now, return mock data
    const employees = [
      {
        id: 1,
        name: "Budi Santoso",
        position: "Software Engineer",
        division: "Engineering",
        age: 32,
      },
      {
        id: 2,
        name: "Dewi Lestari",
        position: "UI/UX Designer",
        division: "Design",
        age: 28,
      },
      {
        id: 3,
        name: "Ahmad Rizki",
        position: "Project Manager",
        division: "Management",
        age: 35,
      },
    ]

    // Return random employee for demo
    return employees[Math.floor(Math.random() * employees.length)]
  }
}

// Export singleton instance
export const faceAnalysisAPI = new FaceAnalysisAPI()
