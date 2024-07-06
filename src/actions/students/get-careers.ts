import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { Career } from "@/types/careers"
import axios from "axios"

export const getCareers = async (): Promise<Career[] | null> => {
  const user  = await currentUser()

  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/careers`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => response.data)
  .catch(() => null)
}