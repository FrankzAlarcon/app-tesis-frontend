"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import axios from "axios"

export const updateImageProfile = async (prevState: any, data: FormData) => {
  const user = await currentUser()
  if (!user) {
    return {
      error: 'No estás autenticado'
    }
  }

  const image = data.get('image') as File
  if (!image || image.size === 0) {
    return {
      error: 'Debes cargar una imagen'
    }
  }

  if (image.size > 3 * 1024 * 1024) {
    return {
      error: 'El archivo debe pesar menos de 3MB'
    }
  }

  if (!['image/jpeg', 'image/png'].includes(image.type)) {
    return {
      error: 'El archivo debe ser una imagen en formato JPEG o PNG'
    }
  }

  try {
    await axios.put(`${BACKEND_API_URL}/business/update-image-profile`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    console.log('Error al actualizar la imagen de perfil', error)
    return {
      error: 'Error al actualizar la imagen de perfil'
    }
  }

  revalidatePath('/b')

  return {
    data: {
      updated: true
    }
  }
}