"use server"

import { currentUser } from "@/lib/auth"
import { InputType, ReturnType } from "./type"
import { BACKEND_API_URL } from "@/config/config"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { removePostulationSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    const rata = await axios.delete(`${BACKEND_API_URL}/postulations/${data.postulationId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })

    if (rata.status !== 200) {
      console.log('Error', rata)
    }

    console.log('RATA', rata.data)
  } catch (error) {
    return {
      error: 'Error al eliminar certificación'
    }
  }

  revalidatePath('/e/postulations')

  return {
    data: {
      removed: true
    }
  }
}

export const removePostulation = createSafeAction(removePostulationSchema, action)