"use server"
import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { PostulationCard } from "@/types/postulations"
import axios from "axios"

export const getPostulations = async (): Promise<PostulationCard[] | null> => {
  const user = await currentUser()
  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/postulations/by-student`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => response.data.data)
}