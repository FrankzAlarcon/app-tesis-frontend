import axios from 'axios'

export const AddCovenant = async (data: any, token: string) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/business-covenant`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data)
}