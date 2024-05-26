"use server"

import axios from "axios"
import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { InputType, ReturnType } from "./type"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { removeCertificationSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    await axios.delete(`${BACKEND_API_URL}/certifications/${data.certificationId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    return {
      error: 'Error al eliminar certificación'
    }
  }

  revalidatePath('/profile')

  return {
    data: {
      removed: true
    }
  }
}

export const removeCertification = createSafeAction(removeCertificationSchema, action)