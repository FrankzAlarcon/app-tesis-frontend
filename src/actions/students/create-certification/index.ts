"use server"

import { currentUser } from "@/lib/auth";
import { InputType, ReturnType } from "./types";
import { BACKEND_API_URL } from "@/config/config";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { createCertificationSchema } from "./schema";
import axios from "axios";

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()
  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  const { emissionDate, ...rest } = data
  const mappedData = {
    ...rest,
    emissionDate: emissionDate.toISOString()
  }

  try {
    await axios.post(`${BACKEND_API_URL}/certifications`, mappedData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    return {
      error: 'Ya existe una certificación con ese nombre'
    }
  }

  revalidatePath('/profile')

  return {
    data: {
      created: true
    }
  }
}

export const addCertification = createSafeAction(createCertificationSchema, action)