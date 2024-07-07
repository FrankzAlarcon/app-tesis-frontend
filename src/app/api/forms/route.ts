import { createPdf } from "@/actions/students/create-pdf"
import { faa119FormSchema } from "@/actions/students/create-pdf/schema"
import { arrayBufferToBase64 } from "@/lib/files-fns"

export async function POST(request: Request) {
  const body = await request.json()

  const validatedFields = faa119FormSchema.safeParse(body)

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors
    return Response.json({ fieldErrors }, { status: 400 })
  }
  const rta = await createPdf(validatedFields.data)
  if (rta.error || !rta.data) {
    return Response.json({ error: rta.error }, { status: 400 })
  }
  const base64 = await arrayBufferToBase64(rta.data.data)

  return Response.json({ data: base64 }, { status: 200 })
}