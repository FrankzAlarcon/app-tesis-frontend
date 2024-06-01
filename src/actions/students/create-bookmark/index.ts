"use server"

import { createBookmarkSchema } from './schema';
import { currentUser } from "@/lib/auth"
import { InputType, ReturnType } from "./types"
import axios from "axios"
import { BACKEND_API_URL } from "@/config/config"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    const { path, ...rest } = data
    await axios.post(`${BACKEND_API_URL}/bookmarks`, rest, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Ya existe un marcador con ese id'
    }
  }

  revalidatePath(data.path ?? '/e')

  return {
    data: {
      created: true
    }
  }
}

export const createBookmark = createSafeAction(createBookmarkSchema, action)