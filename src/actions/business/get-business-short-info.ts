"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ShortBusinessInformation } from "@/types/business"
import axios from "axios"

export const getBusinessShortInfo = async (): Promise<ShortBusinessInformation[] | null> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/business/short-information`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => response.data.data)
  .catch((err) => {
    console.error(err)
    return null
  })
}