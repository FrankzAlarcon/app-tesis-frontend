'use server'

import axios from "axios"
import { InputType, ReturnType } from "./type"
import { currentUser } from "@/lib/auth"
import { BACKEND_API_URL } from "@/config/config"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { removeConvenantSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }


  try {
    await axios.delete(`${BACKEND_API_URL}/business-covenant`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      },
      data: JSON.stringify({
        businessId: data.convenantId
      })
    })
  } catch (error) {
    console.log('Error al eliminar la publicación', error)
    return {
      error: 'Error al eliminar la publicación'
    }
  }

  revalidatePath('/a/companies')
  revalidatePath('/a/companies/add-covenant')

  return {
    data: {
      removed: true
    }
  }
}


export const removeCovenant = createSafeAction(removeConvenantSchema, action)



