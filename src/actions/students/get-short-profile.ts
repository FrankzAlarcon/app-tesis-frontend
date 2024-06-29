"use server"

import { BACKEND_API_URL } from '@/config/config'
import { currentUser } from '@/lib/auth'
import { ShortStudentProfile } from '@/types/student'
import axios from 'axios'

export const getShortProfile = async (): Promise<ShortStudentProfile | null> => {
  const user = await currentUser()
  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/students/short-profile`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
    .catch((err) => {
      console.log('error', err)
  })
}