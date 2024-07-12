import { uploadPendingSchema } from "./schema"
import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import axios from "axios"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const fields = {
    url: formData.get('url') as string
  }
  const validatedFields = uploadPendingSchema.safeParse(fields)

  if (!validatedFields.success) {
    return Response.json({
      ...validatedFields.error.flatten().fieldErrors
    }, { status: 400 })
  }

  const file = formData.get('file') as File | null | undefined
  if (!file || !file.name || file.size === 0) {
    return Response.json({
      error: "Se debe cargar un archivo"
    }, { status: 400 })
  }

  if (file.size > 3 * 1024 * 1024) {
    return Response.json({
      error: "El archivo debe pesar menos de 3MB"
    }, { status: 400 })
  }

  if (!['application/pdf'].includes(file.type)) {
    return Response.json({
      error: "El archivo debe ser un PDF"
    }, { status: 400 })
  }
  const user = await currentUser()
  const newFormData = new FormData()
  newFormData.append('url', validatedFields.data.url)
  newFormData.append('file', file)

  try {
    const rta = await axios.post(`${BACKEND_API_URL}/student-form/upload-pending`, newFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.accessToken}`
      }
    })
    if (rta.status === 201) {
      return Response.json({
        data: {
          upload: true
        }
      }, { status: 200 })
    }
    console.log('Error al subir formulario', rta.data)
    return Response.json({
      error: 'Error al subir formulario'
    }, { status: 500 })
  } catch (error) {
    console.log((error as any).response.data)
    return Response.json({
      error: 'Error al subir formulario'
    }, { status: 500 })
  }
}