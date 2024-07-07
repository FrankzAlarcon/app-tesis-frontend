"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { BusinessProfile } from "@/types/business";
import axios from "axios"

function decodeBase64Url(base64Url: string) {
  // Reemplazar caracteres específicos de URL
  base64Url = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
  // Agregar padding si es necesario
  const pad = base64Url.length % 4;
  if (pad) {
    if (pad === 2) base64Url += '==';
    else if (pad === 3) base64Url += '=';
  }
  
  // Decodificar el base64 usando Buffer
  const decodedData = Buffer.from(base64Url, 'base64').toString('utf-8');
  
  // Parsear el resultado como JSON
  return JSON.parse(decodedData);
}

interface PublicBusinessProfile {
  profile: BusinessProfile
  isPublic: boolean
}

export const getPublicBusinessProfile = async (businessId: string): Promise<PublicBusinessProfile | null> => {
  const user = await currentUser()

  if (!user) {
    return null
  }
  const payload = decodeBase64Url(user.accessToken.split('.')[1])
  return axios.get(`${BACKEND_API_URL}/business/public/profile/${businessId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => {
    return ({
      profile: response.data,
      isPublic: payload.businessId !== response.data.id
    })
  })
    .catch(error => {
      console.error(error)
      return null
    })
}