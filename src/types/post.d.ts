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
  image: string | null
  business: {
    id: string
    name: string
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
  }
}
