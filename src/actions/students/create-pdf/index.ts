"use server"

import axios from "axios";
import { currentUser } from "@/lib/auth";
import { InputType, ReturnType } from "./types";
import { BACKEND_API_URL } from "@/config/config";
import { createSafeAction } from "@/lib/create-safe-action";
import { faa119FormSchema } from "./schema";

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user || !user.accessToken) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    const response = await axios.post(`${BACKEND_API_URL}/forms/faa119/pdf`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      },
      responseType: 'arraybuffer'
    })
    if (response.status !== 201) {
      return {
        error: 'Ha ocurrido un error, por favor intenta nuevamente.'
      }
    }
    return {
      data: {
        data: response.data
      }
    }
  } catch (error) {
    return {
      error: 'Ha ocurrido un error, por favor intenta nuevamente.'
    }
  }
}

export const createPdf = createSafeAction(faa119FormSchema, action)