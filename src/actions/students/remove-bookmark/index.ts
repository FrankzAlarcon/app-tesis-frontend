"use server"

import { currentUser } from "@/lib/auth"
import { InputType, ReturnType } from "./types"
import axios from "axios"
import { BACKEND_API_URL } from "@/config/config"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { removeBookmarkSchema } from "./schema"

const decodeAccessToken = (accessToken: string) => {
  const payload = accessToken.split('.')[1]
  const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8')
  return JSON.parse(decodedPayload)
}

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }
  const decodedToken = decodeAccessToken(user.accessToken)
  try {
    const { publicationId } = data
    await axios.delete(`${BACKEND_API_URL}/bookmarks/${decodedToken.studentId}/${publicationId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    return {
      error: 'Ha ocurrido un error al eliminar el marcador'
    }
  }

  revalidatePath(data.path ?? '/e')

  return {
    data: {
      removed: true
    }
  }
}

export const removeBookmark = createSafeAction(removeBookmarkSchema, action)