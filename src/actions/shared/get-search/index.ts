"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import axios from "axios"
import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-action"
import { searchSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    const response = await axios.get(`${BACKEND_API_URL}/users/search/${data.text}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })

    return {
      data: response.data
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error al buscar usuario'
    }
  }
}

export const getSearch = createSafeAction(searchSchema, action)