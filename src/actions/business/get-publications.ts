"use server"
import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ShortPublication } from "@/types/business"
import axios from "axios"

export const getPublications = async (): Promise<ShortPublication[] | null> => {
  const user = await currentUser()

  if (!user?.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/publications`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
    .catch((err) => console.log('error', err))
}

//simulacion de la peticion
export const getPublicationsMock = async (): Promise<ShortPublication[] | null> => {
  return [
    {
      id: '1',
      title: 'Pasante Web - Frontend',
      city: 'Quito',
      modality: 'Presencial',
      createdAt: '2024-03-01',
      endDate: '2024-03-30',
      candidateCount: 5,
      postulationCount: 3,
    },
    {
      id: '2',
      title: 'Pasante Web - Backend',
      city: 'Quito',
      modality: 'Remoto',
      createdAt: '2024-03-01',
      endDate: '2024-03-30',
      candidateCount: 5,
      postulationCount: 3,
    },
    {
      id: '3',
      title: 'Pasante Web - Fullstack',
      city: 'Quito',
      modality: 'Presencial',
      createdAt: '2021-09-01',
      endDate: '2021-09-30',
      candidateCount: 5,
      postulationCount: 3,
    },
    {
      id: '4',
      title: 'Pasante Web - Frontend',
      city: 'Quito',
      modality: 'Presencial',
      createdAt: '2021-09-01',
      endDate: '2021-09-30',
      candidateCount: 5,
      postulationCount: 3,
    },
    {
      id: '5',
      title: 'Pasante Web - Backend',
      city: 'Quito',
      modality: 'Remoto',
      createdAt: '2021-09-01',
      endDate: '2021-09-30',
      candidateCount: 5,
      postulationCount: 3,
    },
  ]
}


