import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { BACKEND_API_URL } from "@/config/config"

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          // validate fields
  
          const { email, password } = credentials
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

          console.log(user)
          return {
            ...user.user,
            accessToken: user.accessToken
          }
        } catch (error) {
          console.log('[error]', error)
          // return null
        }
      }
    })
  ],
} satisfies NextAuthConfig