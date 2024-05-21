import { checkLoggedIn } from "@/actions/check-logged-in";
import { auth } from "@/auth";

export async function POST(req: any) {
  console.log("EJECUTANDO POST - CURRENT")
  console.log(req.nextUrl)
  const session = await auth()
  if (!session) {
    console.log("NO HAY SESION")
    return Response.redirect('/login', )
  }
  const isLoggedIn = await checkLoggedIn(session?.user.accessToken)
  console.log({isLoggedIn})
  if (!isLoggedIn) {
    console.log("NO ESTA LOGUEADO")
    return Response.redirect('/login')
  }
  return Response.json({ isLoggedIn })
}