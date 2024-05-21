"use server"

import axios from "axios"
import { signOut } from "./signout"
import { BACKEND_API_URL } from "@/config/config"

export const checkLoggedIn = async (accessToken: string | null | undefined) => {
  console.log("Ejecutando checkLoggedIn", accessToken)
  if (!accessToken) {
    await signOut()
    return false
  }
  return axios.post(`${BACKEND_API_URL}/auth/is-logged-in`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(() => {
    return true
  }).catch(async () => {
    await signOut()
    return false
  })
}