"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ShortBusinessProfile } from "@/types/business"
import axios from "axios"

export const getPublicBusinessShortProfile = async (businessId: string): Promise<ShortBusinessProfile | null> => {
  const user = await currentUser()
  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/business/public/short-profile/${businessId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => response.data)
    .catch(error => {
      console.error('Error fetching public business short profile', error)
      return null
    })
}