"use server"

import axios from "axios";
import { InputType, ReturnType } from "./type";
import { BACKEND_API_URL } from "@/config/config";
import { createSafeAction } from "@/lib/create-safe-action";
import { resendConfirmationEmailSchema } from "./schema";

const action = async (data: InputType): Promise<ReturnType> => {
  try {
    console.log('data', data)
    await axios.post(`${BACKEND_API_URL}/auth/resend-confirmation-email`, data)
  } catch (error) {
    return {
      error: 'Error al enviar el correo de confirmación'
    }
  }

  return {
    data: {
      sent: true
    }
  }
}

export const resendConfirmationEmail = createSafeAction(resendConfirmationEmailSchema, action)