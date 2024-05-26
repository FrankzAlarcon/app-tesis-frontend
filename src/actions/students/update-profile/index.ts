"use server"

import { completeProfileSchema } from "@/schemas/profile.schema"
import axios from "axios"
import { InputType, ReturnType } from "./type"
import { currentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { BACKEND_API_URL } from "@/config/config"
import { createSafeAction } from "@/lib/create-safe-action"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    await axios.put(`${BACKEND_API_URL}/students/complete-profile`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    return {
      error: 'Error al actualizar perfil'
    }
  }

  revalidatePath('/profile')

  return {
    data: {
      updated: true
    }
  }
}

export const updateProfile = createSafeAction(completeProfileSchema, action)