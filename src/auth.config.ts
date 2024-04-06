import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./fake-data/db"

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // validate fields

        const { email, password } = credentials

        const user = await getUserByEmail(email as string)

        if (!user || !user.password) return null

        // talvez se necesite usar bcrypt para comparar passwords
        const passwordsMatch = user.password === password

        if (passwordsMatch) return user

        return null
      }
    })
  ],
} satisfies NextAuthConfig