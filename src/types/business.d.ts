export interface Business {
  id: string
  name: stirng
  code: string
  province: string | null
  city: string | null
  phone: string | null
  description: string | null
  hasCovenant: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface BusinessProfile {
  id: string
  name: string
  code: string
  province: string | null
  city: string | null
  phone: string | null
  description: string | null
  shortPresentation: string | null
  publications: ShortPublication[]
  hasCovenant: boolean
}

export interface Publication {
  id: string
  title: string
  location: string
  description: string
  modality: string
  entryTime: string
  departureTime: string
  benefits: string[]
  requirements: string[]
  skills: string[]
  imageUrl: string | null
  remuneration: number
  createdAt: string
  endDate: string
  updatedAt: string
  postulations: Postulation[]
}

export interface Postulation {
  id: string
  urlCV: string
  status: string
  student: ShortStudent
  createdAt: string
}

export interface ShortStudentApllicant {
  id: string
  name: string
  email: string
  phone: string | null
  urlProfileStudent: string
  imageUrl: string | null
}

export interface ShortPublication {
  id: string
  title: string
  modality: string
  city: string
  createdAt: string
  endDate: string
  candidateCount: number
  postulationCount: number
}

export interface ShortBusinessInformation {
  id: string
  name: string
}