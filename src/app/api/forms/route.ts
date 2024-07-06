import { createPdf } from "@/actions/students/create-pdf"
import { faa119FormSchema } from "@/actions/students/create-pdf/schema"
import { NextResponse } from "next/server"

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
  const response = new NextResponse(rta.data.data, { status: 200 })
  response.headers.set('Content-Disposition', 'attachment; filename="file.pdf"')
  response.headers.set('Content-Type', 'application/pdf')

  return response
}