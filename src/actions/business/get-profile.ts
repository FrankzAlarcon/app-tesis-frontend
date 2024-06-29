"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { BusinessProfile } from "@/types/business"
import axios from "axios"

//simulacion de la peticion
export const getProfile = async (): Promise<BusinessProfile | null> => {
  const user = await currentUser()

  if (!user) return null

  return await axios.get(`${BACKEND_API_URL}/business/profile`,{
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
    .catch((err) => console.log('error', err))
}

