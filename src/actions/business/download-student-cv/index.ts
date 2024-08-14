"use server"

import { currentUser } from "@/lib/auth"
import { InputType, ReturnType } from "./type"
import axios from "axios"
import { BACKEND_API_URL } from "@/config/config"
import { createSafeAction } from "@/lib/create-safe-action"
import { downloadStudentCvSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user  = await currentUser()

  if (!user || !user.name || !user.accessToken) {
    return {
      error: "Usuario no autenticado"
    }
  }

  try {
    const response = await axios.get(`${BACKEND_API_URL}/students/download-cv/${data.postulationId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
      responseType: 'arraybuffer'
    })

    if (response.status !== 200) {
      return {
        error: 'Ha ocurrido un error al descargar el archivo. Por favor intenta de nuevo.'
      }
    }

    return {
      data: {
        file: response.data
      }
    }
  } catch (error) {
    console.log('Error', (error as any).response?.data)
    return {
      error: 'Ha ocurrido un error al descargar el archivo. Por favor intenta de nuevo.'
    }
  }
}

export const downloadStudentCv = createSafeAction(downloadStudentCvSchema, action)