import { BACKEND_API_URL, NEXT_PUBLIC_BACKEND_API_URL } from '@/config/config'
import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUser } from '@/lib/auth'
import axios from 'axios'

export const AddCovenant = async (data: any, token: string) => {
  console.log(NEXT_PUBLIC_BACKEND_API_URL);
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/business-covenant`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data)
}