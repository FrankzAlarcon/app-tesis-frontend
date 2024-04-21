"use server"
import { signOut as signOutAuth } from '@/auth'

export const signOut = async () => {
  return await signOutAuth()
}