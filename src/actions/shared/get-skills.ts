"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ProjectSkill } from "@/types/student"
import axios from "axios"

export const getSkills = async (): Promise<ProjectSkill[] | null> => {
  const user = await currentUser()

  if (!user?.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/skills`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
  .catch((err) => console.log('error', err))
}