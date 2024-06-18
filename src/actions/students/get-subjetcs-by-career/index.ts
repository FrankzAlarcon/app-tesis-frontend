"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import axios from "axios"
import { InputType, ReturnType } from "./type"
import { createSafeAction } from "@/lib/create-safe-action"
import { getSubjectsByCareerSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    const response = await axios.get(`${BACKEND_API_URL}/subjects/ordered/${data.careerId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })

    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: 'Error al obtener materias'
    }
  }
}

export const getSubjectsByCareer = createSafeAction(getSubjectsByCareerSchema, action)