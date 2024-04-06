import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { encode } from "next-auth/jwt"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SIGN IN", { user, account, profile, email, credentials })
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log("REDIRECT", { url, baseUrl })
      return baseUrl
    },
    async session({ session, user, token }) {
      console.log("SESSION", {session, user, token})
      return session
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT", {token, user, account, profile})
      // const encodedToken = await encode({ token, secret: '', salt: '' })
      return token
    }
  },
})