import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ShortPostInformation } from "@/types/post"
import axios from "axios"
import { create } from "domain"

// export const getPulications = async (businessId: string): Promise<ShortPostInformation[] | null> => {
//   const user = await currentUser()

//   if (!user.accessToken) {
//     return null
//   }

//   return axios.get(`${BACKEND_API_URL}/business/publications/${businessId}`, {
//     headers: {
//       Authorization: `Bearer ${user.accessToken}`
//     }
//   }).then(response => response.data)
//     .catch(error => {
//       console.error('Error fetching short post information', error)
//       return null
//     })
// }

//simulador de la funcion getPulications
export const getPublications = async (businessId: string): Promise<ShortPostInformation[] | null> => {
  console.log('businessId', businessId);
  const publications = [
    {
      id: '1',
      createdAt: '2024-05-26T15:01:14.956Z',
      modality: 'Presencial',
      location: 'Quito',
      tittle: 'Pasante - Desarrollador de software',
      business: {
        id: 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709',
        name: 'Kushki'
      }
    },
    {
      id: '2',
      createdAt: '2024-05-26T15:01:14.956Z',
      modality: 'Presencial',
      location: 'Quito',
      tittle: 'Pasantes - Desarrollador de software',
      business: {
        id: '2',
        name: 'Empresa 2'
      }
    },
    {
      id: '3',
      createdAt: '2024-05-26T15:01:14.956Z',
      modality: 'Presencial',
      location: 'Quito',
      tittle: 'Pasantes - Nodee js',
      business: {
        id: 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709',
        name: 'Kushki'
      }
    }
  ]
  // reetonar las publicaciones que pertenecen a la empresa con el id businessId
  console.log(publications);
  const publicationsByBusiness = publications.filter(publication => publication.business.id === businessId)

  console.log(publicationsByBusiness);
  return publicationsByBusiness
}


