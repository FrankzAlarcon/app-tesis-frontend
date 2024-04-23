import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { BACKEND_API_URL } from "@/config/config"
import { loginSchema } from "./schemas/auth.schema"

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          // validate fields
          const validatedFields = loginSchema.safeParse(credentials)
          if (!validatedFields.success) {
            console.log(validatedFields.error)
            console.log("No validated Fields")
            return null
          }
          const { email, password } = validatedFields.data
          const res = await fetch(`${BACKEND_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })
          if (res.status !== 200) {
            console.log(await res.text())
            return null
          }
          const user = await res.json()
          console.log('authorize',{user})
          return {
            ...user.user,
            accessToken: user.accessToken,
            role: user.user.role.name
          }
        } catch (error) {
          console.log('[error]', error)
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          role: user.role
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.accessToken = token.accessToken as string
          session.user.role = token.role as string
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig