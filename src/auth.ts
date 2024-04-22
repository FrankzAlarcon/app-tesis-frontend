import NextAuth, { DefaultSession, User} from "next-auth"
import authConfig from "@/auth.config"


export type ExtendedUser = DefaultSession['user'] & {
  accessToken: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }

  interface User {
    accessToken: string
  }
}


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/login'
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.accessToken = token.accessToken as string
        }
      }
      return session
    },
  },
})