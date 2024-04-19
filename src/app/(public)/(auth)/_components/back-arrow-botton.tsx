'use client'

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function BackArrowBotton() {

  const currentPath = usePathname();
  const backToHome = '/';
  const backToRegisterType = '/register-type-selection';

  return (
    <div className='absolute top-0 p-4 left-0 '>
      <Link
        href={currentPath === backToRegisterType ? backToHome : backToRegisterType}
        className=''>
        <ArrowLeft size={38} className='text-primary hover:scale-110 transition-transform duration-300 ease-in-out' />
      </Link>
    </div>
  )
}

export default BackArrowBotton