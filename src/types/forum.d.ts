export interface ForumEntry {
  businessId: string
  businessName: string
  businessDescription: string
  businessImageUrl: string
  count: number
  avgGrade: number
}

export interface Forum {
  id: string
  title: string
  description: string
  grade: number
  studentId: string
  businessId: string
  createdAt: string
  updatedAt: string
  student: {
    id: string
    imageUrl: string | null
    user: {
      name: string
    }
  }
}