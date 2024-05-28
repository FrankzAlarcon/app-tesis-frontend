"use server"

import axios from "axios"
import { currentUser } from "@/lib/auth"
import { InputType, ReturnType } from "./types"
import { BACKEND_API_URL } from "@/config/config"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { createProjectSchema } from "./schema"

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return {
      error: 'Usuario no autenticado'
    }
  }

  const { skills, ...rest } = data
  const mappedData = {
    ...rest,
    skillsIds: skills.map((skill) => skill.id)
  }

  try {
    await axios.post(`${BACKEND_API_URL}/projects`, mappedData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    return {
      error: 'Ya existe un proyecto con ese nombre'
    }
  }
  revalidatePath('/profile')

  return {
    data: {
      created: true
    }
  }
}

export const addProject = createSafeAction(createProjectSchema, action)