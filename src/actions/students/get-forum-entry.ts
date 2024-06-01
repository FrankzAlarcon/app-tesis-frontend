import { BACKEND_API_URL } from "@/config/config";
import { currentUser } from "@/lib/auth";
import { Forum } from "@/types/forum";
import axios from "axios";

interface ForumGroup {
  total: number
  totalPages: number
  data: Forum[]
}

export const getForumEntry = async (businessId: string): Promise<ForumGroup | null> => {
  const user = await currentUser()

  if (!user?.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/forum/by-business/${businessId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
  .catch((err) => console.log('error', err))
}