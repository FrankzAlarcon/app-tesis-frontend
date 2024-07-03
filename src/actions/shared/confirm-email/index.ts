"use server"

import axios from "axios";
import { InputType, ReturnType } from "./type";
import { BACKEND_API_URL } from "@/config/config";
import { createSafeAction } from "@/lib/create-safe-action";
import { confirmEmailSchema } from "./schema";

const action  = async (data: InputType): Promise<ReturnType> => {
  try {
    axios.post(`${BACKEND_API_URL}/auth/confirm-email`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
  })
  } catch (error) {
    return {
      error: 'Error al confirmar el correo'
    }
  }

  return {
    data: {
      confirmed: true
    }
  }
}

export const confirmEmail = createSafeAction(confirmEmailSchema, action)