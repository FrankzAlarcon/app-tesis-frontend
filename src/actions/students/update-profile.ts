import { completeProfileSchema } from "@/schemas/profile.schema"
import axios from "axios"
import * as z from 'zod'

export const updateProfile = async (data: z.infer<typeof completeProfileSchema>, accessToken: string): Promise<z.infer<typeof completeProfileSchema>> => {
  return axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/students/complete-profile`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.data)
}