import NavLink from '@/components/nav-link'
import ProfileButton from '@/components/profile-button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { currentUser } from '@/lib/auth'
import { studentRoutes } from '@/routes/student-routes'
import { redirect } from 'next/navigation'
import { getShortProfile } from '@/actions/students/get-short-profile'


const Header = async () => {
  const user = await currentUser()
  const profile = await getShortProfile()
  if (!user) {
    redirect('/login')
  }
  const { role, accessToken, ...rest } = user
  rest.image = profile?.imageUrl
  console.log('[HEADER STUDENT]',rest)
  return (
    <div className='w-full bg-white fixed flex flex-col md:flex-row md:justify-between gap-2 shadow-md z-30 p-2'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex gap-4 items-center justify-between'>
          <Image src="/EPN_logo_big.png" alt='Logo EPN' width={100} height={60} className='md:min-w-24' />
          <div className='md:hidden'>
            <ProfileButton role={role} user={rest as any} />
          </div>
        </div>
        <div className='w-full pt-2 md:max-w-96 lg:min-w-80'>
          <Input className='w-full' placeholder='Buscar' />
        </div>
      </div>
      <div>
        <nav className='flex justify-around items-center'>
          {
            studentRoutes.map(route => (
              <NavLink key={route.href} route={route} borderColorDirection='bottom' />
            ))
          }
        </nav>
      </div>
      <div className='hidden md:flex items-center'>
        <ProfileButton role={role} user={rest as any} />
      </div>
    </div>
  )
}

export default Header