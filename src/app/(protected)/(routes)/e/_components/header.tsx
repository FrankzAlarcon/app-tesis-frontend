import NavLink from '@/components/nav-link'
import ProfileButton from '@/components/profile-button'
import { Input } from '@/components/ui/input'
import { studentRoutes } from '@/routes/student-routes'
import Image from 'next/image'


const Header = () => {
  return (
    <div className='w-full bg-white fixed flex flex-col md:flex-row md:justify-between gap-2 shadow-md z-30 p-2'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex gap-4 items-center justify-between'>
          <Image src="/EPN_logo_big.png" alt='Logo EPN' width={100} height={60} className='md:min-w-24' />
          <div className='md:hidden'>
            <ProfileButton />
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
        <ProfileButton />
      </div>
    </div>
  )
}

export default Header