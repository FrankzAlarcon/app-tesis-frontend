"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ShortInformationCard } from "@/types/post"
import axios from "axios"

export const getLastPostulations = async (): Promise<ShortInformationCard[] | null> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/postulations/last`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching last postulations', error)
    return null
  })
}