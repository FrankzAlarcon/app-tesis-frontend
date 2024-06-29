"use server"

import { BACKEND_API_URL } from '@/config/config'
import { currentUser } from '@/lib/auth'
import { ShortBusinessProfile } from '@/types/business'
import axios from 'axios'

export const getShortProfile = async (): Promise<ShortBusinessProfile | null> => {
  const user = await currentUser()
  if (!user.accessToken) {
    return null
  }

  return axios.get(`${BACKEND_API_URL}/business/short-profile`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
    .catch((err) => {
      console.log('error', err)
  })
}