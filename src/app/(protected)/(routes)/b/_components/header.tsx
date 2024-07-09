import ProfileButton from '@/components/profile-button'
import Image from 'next/image'
import NavLink from '@/components/nav-link'
import { Input } from '@/components/ui/input'
import { companyRoutes } from '@/routes/student-routes'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getShortProfile } from '@/actions/business/get-short-profile'
import Searcher from '@/components/inputs/searcher'


const Header = async () => {
  const user = await currentUser()
  const profile = await getShortProfile()
  if (!user) {
    redirect('/login')
  }
  const { role, accessToken, ...rest } = user
  rest.image = profile?.imageUrl
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
          <Searcher isBusiness />
        </div>
        <div className='w-full'>
          <nav className='flex justify-around items-center'>
            {
              companyRoutes.map(route => (
                <NavLink key={route.href} route={route} borderColorDirection='bottom' />
              ))
            }
          </nav>
        </div>
      </div>
      <div className='hidden md:flex items-center'>
        <ProfileButton role={role} user={rest as any} />
      </div>
    </div>
  )
}

export default Header