import { BACKEND_API_URL } from '@/config/config'
import { currentUser } from '@/lib/auth'
import axios from 'axios'

export const getAllBusiness = async (limit: number = 10, offset: number = 0) => {
  const user = await currentUser()
  return axios.get(`${BACKEND_API_URL}/business?limit=${limit}&offset=${offset}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`
    }
  }).then(res => res.data)
}