import { NextResponse } from "next/server"

export async function POST(request: Request) {
  console.log('Endpoint forms/route.ts')
  const body = await request.json()
  console.log({body})
  const blob = new Blob([JSON.stringify(body.image)], {
    type: "application/json",
  })

  const headers = new Headers()

  headers.set("Content-Type", "application/png")
  
  return new NextResponse(blob, {
    status: 200,
    headers,
  })
}