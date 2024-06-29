import AvatarComponent from '@/components/avatar'
import { ShortBusinessProfile } from '@/types/business'
import React from 'react'

interface BusinessCardProps {
  user: ShortBusinessProfile
}

const BusinessCard = ({
  user
}: BusinessCardProps) => {
  return (
    <div className='rounded-lg'>
      <div>

      </div>
      <div>
        <AvatarComponent src='https://github.com/shadcnui' />
      </div>
      <div>

      </div>
      
    </div>
  )
}

export default BusinessCard