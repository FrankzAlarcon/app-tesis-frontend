export interface Business  {
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

export interface ShortBusinessInformation {
  id: string
  name: string
}