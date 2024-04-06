"use server";

import { RegisterValues } from '@/actions/register';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: RegisterValues) => {
  const { email, password } = values

  try {
    await signIn('credentials', {
      email,
      password,
      //callbackUrl se puede usar para redireccionar segun el role
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    // TODO
    if (error instanceof AuthError) {
      switch(error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials"
          }
        default:
          {
            error: "Something went wrong"
          }
      }
    }
    throw error
  }
}