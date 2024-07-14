"use server"

import { currentUser } from "@/lib/auth";
import { InputType, ReturnType } from "./types";
import { base64ToBlob } from "@/lib/files-fns";
import { createSafeAction } from "@/lib/create-safe-action";
import { saveFormPdfSchema } from "./schema";
import { BACKEND_API_URL } from "@/config/config";
import axios from "axios";
import { faa119FormSchema } from "../../create-pdf/schema";
import { revalidatePath } from "next/cache";

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()
  console.log(user)
  if (!user || !user.name || !user.accessToken) {
    return { error: "User not found" }
  }
  if (!data.formData) {
    return {
      error: 'No se ha enviado el formulario. Por favor intenta de nuevo.'
    }
  }
  const validatedFormData = faa119FormSchema.safeParse(data.formData)

  if (!validatedFormData.success) {
    return {
      error: 'Ha ocurrido un error al validar los datos del formulario. Por favor intenta de nuevo.'
    }
  }

  const blobData = await base64ToBlob(data.data, 'application/pdf')
  const formData = new FormData()
  formData.append('formId', data.formId)
  formData.append('studentId', user.name)
  formData.append('data', JSON.stringify(validatedFormData.data))
  formData.append('file', blobData, `${user.name}_${user.id}.pdf`)
  formData.append('status', 'EMITIDO')

  try {
    await axios.post(`${BACKEND_API_URL}/student-form/upload-emitted`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  } catch (error) {
    console.log((error as any).response.data)
    return {
      error: 'Ha ocurrido un error al guardar el archivo. Por favor intenta de nuevo.'
    }
  }

  revalidatePath('/e/profile')

  return { 
    data: {
      saved: true
    }
  }
}

export const uploadEmittedForm = createSafeAction(saveFormPdfSchema, action)