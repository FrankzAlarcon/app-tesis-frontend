import { BACKEND_API_URL, NEXT_PUBLIC_BACKEND_API_URL } from '@/config/config'
import { currentUser } from '@/lib/auth'
import axios from 'axios'

export const RemoveCovenant = async (id: string, token: string) => {
  const data = {
    businessId: id
  }

  return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/business-covenant`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data
  }).then(res => res.data)
}