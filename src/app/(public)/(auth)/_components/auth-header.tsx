import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function AuthHeader() {
  return (
    <header className='h-14 shadow-lg bg-white py-2 px-6 flex flex-row justify-center items-center relative'>
      <div className='flex flex-row items-center gap-2 absolute left-3 '>
        <Link href='/' className='flex flex-row gap-1 items-center hover:text-primary'>
          <ArrowLeft size={25} className='text-detail' />
          <p className='text-sm '>Regresar</p>
        </Link>
      </div>
      <div className=''>

        <p>logo: Bolsa de empleo</p>
      </div>
    </header>
  )
}

export default AuthHeader