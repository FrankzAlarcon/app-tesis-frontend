"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { Publication } from "@/types/business"
import axios from "axios"

export const getPublicationEntry = async (publicationId: string): Promise<Publication | null> => {
  const user = await currentUser()
  if (!user?.accessToken) {
    return null
  }

  if (!publicationId) {
    return null
  }
  console.log(`${BACKEND_API_URL}/business/publications/${publicationId}`)
  console.log(user?.accessToken)
  return axios.get<Publication>(`${BACKEND_API_URL}/business/publications/${publicationId}`, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`
    }
  }).then(res => {
    console.log(res.data)
    return res.data
  })
  .catch((err) => {
    console.log('error', err)
    return null
  })
}

