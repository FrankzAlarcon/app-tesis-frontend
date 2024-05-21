import { BACKEND_API_URL, NEXT_PUBLIC_BACKEND_API_URL } from "@/config/config"
import { completeProfileSchema } from "@/schemas/profile.schema"
import * as z from 'zod'

export const updateProfile = async (data: z.infer<typeof completeProfileSchema>, token: string) => {
  console.log(data)
  console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL)
}