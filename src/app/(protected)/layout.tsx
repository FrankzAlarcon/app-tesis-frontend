import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

const AuthLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const session = await auth()

  return (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )
}

export default AuthLayout