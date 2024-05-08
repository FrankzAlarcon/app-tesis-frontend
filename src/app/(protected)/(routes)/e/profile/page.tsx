import Image from 'next/image'
import React from 'react'


// TODO: Endpoint for user profile
const ProfilePage = () => {
  return (
    <div>
      <div className='w-full h-48'>
        <Image src='/profile-background.png' className='w-full h-full' alt='Profile background' width={400} height={200}/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default ProfilePage