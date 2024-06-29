export interface PostulationCard {
  id: string
  title: string
  modality: string
  createdAt: string
  postulationId: string
  business: {
    name: string
    province: string | null
    imageUrl: string | null
  }
}