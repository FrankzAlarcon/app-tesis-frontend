export interface Post {
  id: string
  description: string
  modality: string
  entryTime: string
  departureTime: string
  benefits: string
  requirements: string
  url: string | null
  remuneration: string
  businessId: string
  business: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}