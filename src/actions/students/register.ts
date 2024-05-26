"use server"

import { BACKEND_API_URL } from "@/config/config"
import { registerSchema } from "@/schemas/auth.schema"
import { z } from "zod"

export const registerStudent = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Campos no válidos'
    }
  }

  const { passwordConfirmation, ...rest } = validatedFields.data

  return fetch(`${BACKEND_API_URL}/auth/register-student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rest)
  }).then((res) => {
    if (res.status !== 201) {
      console.log(res.statusText)
      return {
        error: 'Error al registrar usuario'
      }
    }
    return res.json()
  })
}