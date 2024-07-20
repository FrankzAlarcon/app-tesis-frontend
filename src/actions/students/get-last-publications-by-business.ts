"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ShortInformationCard } from "@/types/post"
import axios from "axios"

//simulador de la funcion getPulications
export const getLastPublicationsByBusiness = async (businessId: string): Promise<ShortInformationCard[] | null> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/publications/last/${businessId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => response.data)
    .catch(error => {
      console.error('Error fetching short post information', error)
      return null
    })
}


