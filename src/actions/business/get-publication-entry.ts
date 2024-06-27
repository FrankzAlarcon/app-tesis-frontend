import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { Publication } from "@/types/business"
import { Description } from "@radix-ui/react-toast"
import axios from "axios"

// export const getPublicationEntry = async (publicationId: string): Promise<Publication | null> => {
//   const user = currentUser()
//   if (!user?.accessToken) {
//     return null
//   }

//   const { data } = await axios.get<Publication>(`${BACKEND_API_URL}/publications/${publicationId}`, {
//     headers: {
//       Authorization: `Bearer ${user?.accessToken}`
//     }
//   })
//   return data
// }

// simular la respuesta de la API
export const getPublicationEntryMock = async (publicationId: string): Promise<Publication> => {
  const publications = [{
    id: '1',
    title: 'Pasante Web - Frontend',
    location: 'Quito',
    description: 'En Villamar S.A., estamos buscando un pasante entusiasta y con ganas de aprender para unirse a nuestro equipo de desarrollo web. Si eres estudiante o recién graduado en informática, ingeniería de software o campos relacionados, y estás buscando una oportunidad para aplicar tus conocimientos en el mundo real, ¡este puesto es para ti!',
    modality: 'Presencial',
    entryTime: '08:00',
    departureTime: '17:00',
    benefits: ['Oportunidad de aprendizaje', 'Horario flexible', 'Ambiente de trabajo dinámico'],
    requirements: ['Conocimientos básicos de HTML, CSS y JavaScript', 'Habilidades de comunicación', 'Capacidad para trabajar en equipo'],
    skills: ['HTML', 'CSS', 'JavaScript', 'Comunicación', 'Trabajo en equipo'],
    remuneration: 200,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    endDate: '2024-03-30',
    postulations: [
      {
        id: '1',
        urlCV: '',
        status: 'Pendiente',
        student: {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan.perez@epn.edu.ec',
          phone: '0999999999',
          urlProfileStudent: '',
          imageUrl: 'https://randomuser',
        },
        createdAt: '2024-03-01',
      },
      {
        id: '2',
        urlCV: '',
        status: 'Aceptado',
        student: {
          id: '2',
          name: 'Ana Gómez',
          email: 'ana.gomez@epn.edu.ec',
          phone: '0999999999',
          urlProfileStudent: '',
          imageUrl: 'https://randomuser',
        },
        createdAt: '2024-03-01',
      },
    ]
  },
  {
    id: '2',
    title: 'Pasante Web - Backend',
    location: 'Quito',
    description: 'En Villamar S.A., estamos buscando un pasante entusiasta y con ganas de aprender para unirse a nuestro equipo de desarrollo web. Si eres estudiante o recién graduado en informática, ingeniería de software o campos relacionados, y estás buscando una oportunidad para aplicar tus conocimientos en el mundo real, ¡este puesto es para ti!',
    modality: 'Presencial',
    entryTime: '08:00',
    departureTime: '17:00',
    benefits: ['Oportunidad de aprendizaje', 'Horario flexible', 'Ambiente de trabajo dinámico'],
    requirements: ['Conocimientos básicos de HTML, CSS y JavaScript', 'Habilidades de comunicación', 'Capacidad para trabajar en equipo'],
    skills: ['HTML', 'CSS', 'JavaScript', 'Comunicación', 'Trabajo en equipo'],
    remuneration: 200,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    endDate: '2024-03-30',
    postulations: [
      {
        id: '1',
        urlCV: '',
        status: 'Pendiente',
        student: {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@email.com',
          phone: '0999999999',
          urlProfileStudent: '',
          imageUrl: 'https://randomuser',
        },
        createdAt: '2024-03-01',
      },
      {
        id: '2',
        urlCV: '',
        status: 'Aceptado',
        student: {
          id: '2',
          name: 'Ana Gómez',
          email: 'ana@ejemplo.com',
          phone: '0999999999',
          urlProfileStudent: '',
          imageUrl: 'https://randomuser',
        },
        createdAt: '2024-03-01',
      },
    ]
  },
  {
    id: '3',
    title: 'Pasante Web - Fullstack',
    location: 'Quito',
    description: 'En Villamar S.A., estamos buscando un pasante entusiasta y con ganas de aprender para unirse a nuestro equipo de desarrollo web. Si eres estudiante o recién graduado en informática, ingeniería de software o campos relacionados, y estás buscando una oportunidad para aplicar tus conocimientos en el mundo real, ¡este puesto es para ti!',
    modality: 'Presencial',
    entryTime: '08:00',
    departureTime: '17:00',
    benefits: ['Oportunidad de aprendizaje', 'Horario flexible', 'Ambiente de trabajo dinámico'],
    requirements: ['Conocimientos básicos de HTML, CSS y JavaScript', 'Habilidades de comunicación', 'Capacidad para trabajar en equipo'],
    skills: ['HTML', 'CSS', 'JavaScript', 'Comunicación', 'Trabajo en equipo'],
    remuneration: 200,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    endDate: '2024-03-30',
    postulations: [
      {
        id: '1',
        urlCV: '',
        status: 'Pendiente',
        student: {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
          phone: '0999999999',
          urlProfileStudent: '',
          imageUrl: 'https://randomuser',
        },
        createdAt: '2024-03-01',
      },
    ]
  }
  ]
  return publications.find(publication => publication.id === publicationId) as Publication
}

