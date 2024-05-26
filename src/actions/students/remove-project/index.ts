"use server"

import axios from "axios"
import { InputType, ReturnType } from "./type"
import { currentUser } from "@/lib/auth"
import { BACKEND_API_URL } from "@/config/config"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { removeProjectSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    await axios.delete(`${BACKEND_API_URL}/projects/${data.projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    return {
      error: 'Error al eliminar proyecto'
    }
  }

  revalidatePath('/profile')

  return {
    data: {
      removed: true
    }
  }
}

export const removeProject = createSafeAction(removeProjectSchema, action)