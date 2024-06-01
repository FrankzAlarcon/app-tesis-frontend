import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { ForumEntry } from "@/types/forum"
import axios from "axios"

interface ForumGroup {
  total: number
  totalPages: number
  data: ForumEntry[]
}

export const getForumByGroup = async (): Promise<ForumGroup | null> => {
  const user = await currentUser()

  if (!user?.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/forum/group-by-business`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
  .catch((err) => console.log('error', err))
}