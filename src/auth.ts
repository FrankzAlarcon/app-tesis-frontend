import NextAuth, { DefaultSession, User} from "next-auth"
import authConfig from "@/auth.config"


export type ExtendedUser = DefaultSession['user'] & {
  accessToken: string
  role: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }

  interface User {
    accessToken: string
    role: string
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
})