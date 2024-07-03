export interface Post {
  id: string
  title: string
  description: string
  modality: string
  entryTime: string
  departureTime: string
  benefits: string
  requirements: string
  url: string | null
  remuneration: string
  businessId: string
  imageUrl: string | null
  business: {
    id: string
    name: string
    imageUrl: string | null
  }
  bookmarked: boolean
  createdAt: string
  updatedAt: string
}


export interface ShortInformationCard {
  id: string
  title: string
  modality: string
  createdAt: string
  business: {
    id: string
    name: string
    province: string | null
    imageUrl: string | null
  }
}
