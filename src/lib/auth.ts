"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const currentUser = async () => {
  const user = await auth()

  if (!user) {
    redirect('/login')
  }

  return user?.user
}