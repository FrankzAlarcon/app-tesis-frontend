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
  image: string | null
  business: {
    id: string
    name: string
  }
  bookmarked: boolean
  createdAt: string
  updatedAt: string
}


export interface ShortPostInformation {
  id: string
  createdAt: string
  modality: string
  location: string
  tittle: string
  business: {
    id: string
    name: string
  }
}
