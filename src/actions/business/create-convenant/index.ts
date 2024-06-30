'use server'

import axios from "axios"
import { InputType, ReturnType } from "./type"
import { currentUser } from "@/lib/auth"
import { BACKEND_API_URL } from "@/config/config"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { addConvenantSchema } from "./schema"


const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }


  try {

    await axios.post(`${BACKEND_API_URL}/business-covenant`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    console.log('Error al agregar convenio', (error as any).response.data)
    return {
      error: 'Error al agregar el convenio'
    }
  }

  revalidatePath('/a/companies')
  revalidatePath('/a/companies/add-covenant')

  return {
    data: {
      created: true
    }
  }
}


export const createConvenant = createSafeAction(addConvenantSchema, action)


