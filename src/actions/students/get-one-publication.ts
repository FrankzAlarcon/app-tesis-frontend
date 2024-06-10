"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { Post } from "@/types/post"
import axios from "axios"

interface Publication {
  publication: Post
  wasAlreadyPostulated: boolean
}

export const getOnePublication = async (publicationId: string): Promise<Publication | null> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/publications/${publicationId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching last postulations', error)
    return null
  })
}