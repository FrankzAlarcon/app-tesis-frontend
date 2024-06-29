import AvatarComponent from '@/components/avatar'
import { ShortBusinessProfile } from '@/types/business'
import Link from 'next/link'
import React from 'react'

interface BusinessProfileCardProps {
  user: ShortBusinessProfile
}

const BusinessProfileCard = ({
  user
}: BusinessProfileCardProps) => {
  return (
    <div className='rounded-lg bg-white shadow-md'>
      <div className='h-16 bg-gray-200 rounded-t-lg'>

      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative w-16 h-10'>
          <AvatarComponent className='absolute -top-8 w-16 h-16' src={user?.imageUrl} />
        </div>
        <div className='px-4 pb-2'>
          <p className='text-xl font-bold text-center'>{user?.name}</p>
          {!!user?.city && !!user?.province && (<p className='text-xs text-gray-700 text-center'>{user?.city} - {user?.province}</p>)}
          {!!user?.phone && (<p className='text-xs text-gray-700 text-center'>{user?.phone}</p>)}
          {!!user?.shortPresentation && (<p className='text-sm text-gray-700 text-center'>{user?.shortPresentation}</p>)}
        </div>
        <div className='pb-2'>
          <Link href='/b'
            className='block text-sm py-2 px-4 text-primary font-semibold border border-primary bg-background hover:bg-blue-700 hover:text-white rounded-lg transition duration-300 ease-in-out'
          >
            Ver mi perfil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BusinessProfileCard