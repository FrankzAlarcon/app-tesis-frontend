"use server"

import { currentUser } from "@/lib/auth";
import { InputType, ReturnType } from "./type";
import axios from "axios";
import { BACKEND_API_URL } from "@/config/config";
import { createSafeAction } from "@/lib/create-safe-action";
import { downloadFormSchema } from "./schema";

const action = async (data: InputType): Promise<ReturnType> => {
  const user  = await currentUser()

  if (!user || !user.name || !user.accessToken) {
    return { error: "Usuario no autenticado" }
  }

  try {
    const response = await axios.get(`${BACKEND_API_URL}/student-form/download/${data.studentFormId}/${data.status}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      responseType: 'arraybuffer'
    })
    console.log('Response', response.status)
    if (response.status !== 200) {
      console.log('Error [no 200]', response.data)
      return {
        error: 'Ha ocurrido un error al descargar el archivo. Por favor intenta de nuevo.'
      }
    }
    
    return { data: {
      file: response.data,
      studentName: data.studentName,
      formCode: data.formCode,
      studentId: data.studentId
    } }
  } catch (error) {
    console.log('Error [catch]', (error as any).response?.data)
    return {
      error: 'Ha ocurrido un error al descargar el archivo. Por favor intenta de nuevo.'
    }
  }
}

export const downloadForm = createSafeAction(downloadFormSchema, action)