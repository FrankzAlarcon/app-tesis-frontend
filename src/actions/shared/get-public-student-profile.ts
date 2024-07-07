"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { Profile } from "@/types/student";
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

interface PublicStudentProfile {
  profile: Profile
  isPublic: boolean
}

export const getPublicStudentProfile = async (studentId: string): Promise<PublicStudentProfile | null> => {
  const user = await currentUser()

  if (!user) {
    return null
  }
  const payload = decodeBase64Url(user.accessToken.split('.')[1])
  return axios.get(`${BACKEND_API_URL}/students/public/profile/${studentId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => {
    return ({
      profile: response.data,
      isPublic: payload.studentId !== response.data.id
    })
  })
    .catch(error => {
      console.error(error)
      return null
    })
}