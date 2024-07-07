"use server"

import { BACKEND_API_URL } from "@/config/config";
import { currentUser } from "@/lib/auth";
import { StudentForm } from "@/types/forms";
import axios from "axios";

export const getStudentForms = async (): Promise<StudentForm[] | null> => {
  const user = await currentUser()

  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/forms`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
    .catch((err) => {
      console.log('error', err)
      return null
  })
}