import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ShortBusinessInformation } from "@/types/business"
import axios from "axios"

export const getShortBusinessInformation = async (businessId: string): Promise<ShortBusinessInformation | null> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/business/short-information/${businessId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => response.data)
    .catch(error => {
      console.error('Error fetching short business information', error)
      return null
    })
}