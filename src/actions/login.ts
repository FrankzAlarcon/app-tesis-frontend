"use server";

import * as z from 'zod'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { loginSchema } from '@/schemas/auth.schema';

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Campos no válidos'
    }
  }
  const { email, password } = values
  try {
    await signIn('credentials', {
      email,
      password,
      //callbackUrl se puede usar para redireccionar segun el role
      // redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    console.log('[user server] login', error)
    if (error instanceof AuthError) {
      switch(error.type) {
        case "CredentialsSignin":
          console.log('Credentials signin error')
          return {
            error: "Credenciales incorrectas"
          }
        default:
          return {
            error: "Ops! Ha ocurrido un error"
          }
      }
    }
    console.log("error after switch")
    throw error
  }
}