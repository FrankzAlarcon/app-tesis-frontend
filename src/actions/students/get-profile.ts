"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { Profile } from "@/types/student"
import axios from "axios"

export const getProfile = async (): Promise<Profile | null> => {
  const user = await currentUser()

  if (!user?.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/students/profile`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
}