import { createCertificationSchema } from "@/schemas/profile.schema"
import axios from "axios"
import { z } from "zod"

export const addCertification = async (data: z.infer<typeof createCertificationSchema>, accessToken: string) => {
  const { emissionDate, ...rest } = data
  const mappedData = {
    ...rest,
    emissionDate: emissionDate.toISOString()
  }
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/certifications`, mappedData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.data)
  .catch((error) => console.log(error))
}