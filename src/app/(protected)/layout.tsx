import { auth } from '@/auth'
import CheckIsLoggedIn from '@/components/check-logged-in'
import { SessionProvider } from 'next-auth/react'

const AuthLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const session = await auth()
  return (
    <div>
      <CheckIsLoggedIn>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </CheckIsLoggedIn>
    </div>
  )
}

export default AuthLayout