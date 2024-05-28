import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { Post } from "@/types/post"
import axios from "axios"

export const getFeed = async (): Promise<Post[] | null> => {
  const user = await currentUser()
  if (!user) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/students/feed`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data.data)
  .catch((err) => console.log('error', err))
}