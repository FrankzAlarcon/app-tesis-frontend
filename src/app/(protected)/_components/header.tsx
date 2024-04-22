import React from 'react'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Header() {
  return (
    <header className='h-14 shadow-md bg-white py-2 px-6 flex flex-row justify-between relative'>
      <div className='py-4'>
        <Image
          src="/logo-FIS.png"
          alt="Logo de la facultad de sistemas FIS"
          width={50}
          height={50}
        />
      </div>
      <div className='flex flex-row items-center gap-1'>
        <p className='text-sm'>Usuario usuario</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header