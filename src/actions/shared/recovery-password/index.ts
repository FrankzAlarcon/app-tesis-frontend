"use server"

import axios from "axios"
import { InputType, ReturnType } from "./type"
import { BACKEND_API_URL } from "@/config/config"
import { createSafeAction } from "@/lib/create-safe-action"
import { recoveryPasswordSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  try {
    await axios.post(`${BACKEND_API_URL}/auth/recovery-password`, data, {
    // await axios.post(`http://localhost:3400/api/v1/auth/recovery-password`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.log('Error al eliminar la publicación', (error as any).response.data.message)
    if ((error as any).response.data.message === 'Email not verified') {
      return {
        error: 'Email no verificado'
      }
    }
    return {
      error: 'Error al enviar el correo de recuperación de contraseña'
    }
  }

  return {
    data: {
      success: true
    }
  }
}

export const recoveryPassword = createSafeAction(recoveryPasswordSchema, action)