"use server"

import axios from "axios";
import { InputType, ReturnType } from "./type";
import { BACKEND_API_URL } from "@/config/config";
import { createSafeAction } from "@/lib/create-safe-action";
import { resetPasswordSchema } from "./schema";

const action = async (data: InputType): Promise<ReturnType> => {
  try {
    await axios.post(`${BACKEND_API_URL}/auth/reset-password`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.log('Error enviar reset password', error)
    return {
      error: 'Error al resetear la contraseña'
    }
  }

  return {
    data: {
      success: true
    }
  }
}

export const resetPassword = createSafeAction(resetPasswordSchema, action)