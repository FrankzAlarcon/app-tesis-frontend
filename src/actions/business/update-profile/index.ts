"use server"

import { currentUser } from "@/lib/auth"
import { InputType, ReturnType } from "./type"
import axios from "axios"
import { BACKEND_API_URL } from "@/config/config"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { completeProfileSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    await axios.put(`${BACKEND_API_URL}/business/complete-profile`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    console.log('Error al actualizar perfil', (error as any)?.response)
    return {
      error: 'Error al actualizar perfil'
    }
  }

  revalidatePath('/b')

  return {
    data: {
      updated: true
    }
  }
}

export const updateProfile = createSafeAction(completeProfileSchema, action)