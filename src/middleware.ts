import authConfig from "@/auth.config"
import NextAuth from "next-auth"

import {
  DEFAULT_LOGIN_ADMIN_REDIRECT,
  DEFAULT_LOGIN_BUSINESS_REDIRECT,
  DEFAULT_LOGIN_STUDENT_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  console.log('[MIDDLEWARE]', req.auth)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if ((req.auth as any)?.user.role) {
        switch ((req.auth as any)?.user.role) {
          case "admin":
            return Response.redirect(new URL(DEFAULT_LOGIN_ADMIN_REDIRECT, nextUrl)) as any;
          case "student":
            return Response.redirect(new URL(DEFAULT_LOGIN_STUDENT_REDIRECT, nextUrl)) as any;
          case "business":
            return Response.redirect(new URL(DEFAULT_LOGIN_BUSINESS_REDIRECT, nextUrl)) as any;
          default:
            return null
        }
      }
      return null
      // return Response.redirect(new URL(DEFAULT_LOGIN_ADMIN_REDIRECT, nextUrl)) as any;
    }
    return null
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl)) as any
  }

  return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}