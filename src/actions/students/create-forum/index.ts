"use server"

import axios from "axios";
import { currentUser } from "@/lib/auth";
import { InputType, ReturnType } from "./types";
import { BACKEND_API_URL } from "@/config/config";
import { createSafeAction } from "@/lib/create-safe-action";
import { createForumSchema } from "./schema";

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  try {
    await axios.post(`${BACKEND_API_URL}/forum`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    console.log('Error', (error as any).response.data)
    return {
      error: 'Ha ocurrido un error al publicar tu opinión, por favor intenta nuevamente.'
    }
  }

  return {
    data: {
      created: true
    }
  }
}

export const createForum = createSafeAction(createForumSchema, action)