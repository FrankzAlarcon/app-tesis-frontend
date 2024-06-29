"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { postulationSchema } from "@/schemas/postulation.schema"
import { revalidatePath } from "next/cache"

// interface PrevState {
//   error: string | null
//   message: string[] | undefined
//   cv: string
// }

export const createPostulation = async (prevState: any, data: FormData) => {
  const user = await currentUser()
  console.log('inicio', prevState)
  if (!user.accessToken) {
    return {
      error: 'No estás autenticado',
      publicationId: prevState.publicationId
    }
  }
  const validatedFields =  postulationSchema.safeParse({
    message: data.get('message'),
  })
  if (!validatedFields.success) {
    return {
      ...validatedFields.error.flatten().fieldErrors,
      publicationId: prevState.publicationId
    }
  }
  // validate if cv file is present and is a pdf
  const cv = data.get('cv') as File
  if (!cv || cv.size === 0) {
    return {
      cv: 'Debes cargar tu CV',
      publicationId: prevState.publicationId
    }
  }
  // validate filesize is less than 3MB
  if (cv.size > 3 * 1024 * 1024) {
    return {
      cv: 'El archivo debe pesar menos de 3MB',
      publicationId: prevState.publicationId
    }
  }
  const cvType = cv.type
  if (cvType !== 'application/pdf') {
    return {
      cv: 'El archivo debe ser un PDF',
      publicationId: prevState.publicationId
    }
  }
  
  if (!prevState.publicationId) {
    return {
      error: 'No se ha encontrado la publicación. Por favor, intenta de nuevo.',
      publicationId: prevState.publicationId
    }
  }

  const validatedFormData = new FormData()
  validatedFormData.append('message', validatedFields.data.message)
  console.log(cv)
  validatedFormData.append('cv', cv)
  validatedFormData.append('status', 'PENDIENTE')
  validatedFormData.append('publicationId', prevState.publicationId)

  const rta = await fetch(`${BACKEND_API_URL}/postulations`, {
    method: 'POST',
    body: validatedFormData,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    }      
  })

  const response = await rta.json()

  console.log(response)

  console.log('crear postulation')
  console.log('revalidatePath', `/e/postulations/${prevState.publicationId}`)
  revalidatePath(`/e/postulations/${prevState.publicationId}`)
}