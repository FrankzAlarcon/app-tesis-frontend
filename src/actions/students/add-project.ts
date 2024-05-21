import { createProjectSchema } from "@/schemas/profile.schema"
import axios from "axios"
import { z } from "zod"

export const createProject = async (data: z.infer<typeof createProjectSchema>, accessToken: string) => {
  const { skills, ...rest} = data
  const mappedData = {
    ...rest,
    skillsIds: skills.map((skill) => skill.id)
  }
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/projects`, mappedData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.data)
  .catch((error) => console.log(error))
}