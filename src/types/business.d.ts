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
  shortDescription: string | null
  publications: ShortPublication[]
  hasCovenant: boolean
}

export interface Publication {
  id: string
  title: string
  description: string
  requirements: string
  benefits: string
  modality: string
  remuneration: number
  image: string | null
  createdAt: string
  updatedAt: string
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