import React from 'react'
import Image from 'next/image'
import { auth } from '@/auth'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

async function Header() {
  const session = await auth();

  return (
    <header className='h-14 shadow-md bg-white py-2 px-6 flex flex-row justify-between relative z-30'>
      <div className=''>
        <Image
          src="/logo-FIS.png"
          alt="Logo de la facultad de sistemas FIS"
          width={50}
          height={50}
        />
      </div>
      <div className='flex flex-row items-center gap-1'>
        <p className='text-sm mr-1'>{session?.user?.name}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header