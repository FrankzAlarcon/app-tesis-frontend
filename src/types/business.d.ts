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

export interface ShortBusinessProfile {
  id: string
  name: string
  province: string | null
  city: string | null
  phone: string | null
  imageUrl: string | null
  shortPresentation: string | null
}

export interface BusinessProfile {
  id: string
  name: string
  code: string
  province: string | null
  city: string | null
  phone: string | null
  imageUrl: string | null
  description: string | null
  shortPresentation: string | null
  publications: ShortPublication[]
  hasCovenant: boolean
}

interface ShortSkill {
  publicationSkillId: string
  skillId: string
  name: string
}

export interface Publication {
  id: string
  title: string
  // location: string
  description: string
  modality: string
  entryTime: string
  departureTime: string
  benefits: string
  requirements: string
  skills: ShortSkill[]
  imageUrl: string | null
  remuneration: string
  createdAt: string
  // endDate: string
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

export interface ShortStudent {
  id: string
  name: string
  email: string
  imageUrl: string | null
}

export interface ShortPublication {
  id: string
  title: string
  modality: string
  city?: string
  createdAt: string
  endDate?: string
  candidatesCount: number
  postulationsCount: number
}

export interface ShortBusinessInformation {
  id: string
  name: string
}