import { BACKEND_API_URL } from '@/config/config'
import { currentUser } from '@/lib/auth'
import { createPublicationSchema } from '@/schemas/publication.schema'
import axios from 'axios'
import { z } from 'zod'

type CreatePublication = z.infer<typeof createPublicationSchema>

export async function POST(request: Request) {
  const formData = await request.formData()
  const fields: CreatePublication = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    modality: formData.get('modality') as any,
    entryTime: formData.get('entryTime') as string,
    departureTime: formData.get('departureTime') as string,
    benefits: formData.get('benefits') as string,
    requirements: formData.get('requirements') as string,
    skillsIds: (formData.getAll('skillsIds') as string[]),
    notRegisteredSkills: (formData.getAll('notRegisteredSkills') as string[]),
    remuneration: formData.get('remuneration') as string,    
  }
  console.log(fields)
  const validatedFields = createPublicationSchema.safeParse(fields)

  if (!validatedFields.success) {
    return Response.json({
      ...validatedFields.error.flatten().fieldErrors
    }, { status: 400 })
  }

  let image = formData.get('image') as File | null | undefined
  console.log('image', image)
  if (image && image !== null && image !== undefined && typeof image !== 'string') {
    console.log('Existe imagen', image)
    if (image.size > 3 * 1024 * 1024) {
      return Response.json({
        image: 'La imagen debe pesar menos de 3MB'
      }, { status: 400 })
    }
  
    if (!['image/jpeg', 'image/png' ].includes(image.type)) {
      return Response.json({
        image: 'La imagen debe ser JPG o PNG'
      }, { status: 400 })
    }
  } else {
    image = undefined
  }

  const user = await currentUser()
  console.log('validatedFields', validatedFields.data)
  const validatedFormData = new FormData()
  validatedFormData.append('title', validatedFields.data.title)
  validatedFormData.append('description', validatedFields.data.description)
  validatedFormData.append('modality', validatedFields.data.modality)
  validatedFormData.append('entryTime', validatedFields.data.entryTime)
  validatedFormData.append('departureTime', validatedFields.data.departureTime)
  validatedFormData.append('benefits', validatedFields.data.benefits)
  validatedFormData.append('requirements', validatedFields.data.requirements)
  validatedFormData.append('remuneration', validatedFields.data.remuneration ?? '')
  for (const skillId of validatedFields.data.skillsIds) {
    validatedFormData.append('skillsIds', skillId)
  }
  validatedFormData.append('skillsIds', '')
  validatedFormData.append('skillsIds', '')
  for (const skill of validatedFields.data.notRegisteredSkills) {
    validatedFormData.append('notRegisteredSkills', skill)
  }
  validatedFormData.append('notRegisteredSkills', '')
  validatedFormData.append('notRegisteredSkills', '')
  if (image) validatedFormData.append('image', image)

  try {
    // const rta = await axios.post(`${BACKEND_API_URL}/publications`, validatedFormData, {
      const rta = await axios.post(`http://localhost:3400/api/v1/publications`, validatedFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
  
    if (rta.status === 201) {
      console.log('Publicación creada', rta.data)
      return Response.json({ ...rta.data }, {
        status: 200
      })
    }
    console.log('Error',rta.data)
    return Response.json({ error: 'Error al crear la publicación' }, { status: 500 })
  } catch (error) {
    console.log('Error', (error as any).response.data)
    return Response.json({ error: 'Error al crear la publicación' }, { status: 500 })
  }
}