import { cn } from '@/lib/utils'
import { ArrowLeftFromLine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface NotFoundPageProps {
  complete?: boolean
}

const NotFoundPage = ({
  complete = true
}: NotFoundPageProps) => {
  return (
    <div className={cn('flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100',
      complete && 'w-screen'
    )}>
      <Image
        src='/custom-pages-resources/404.png'
        alt='Pagina no encontrada'
        className='md:w-1/3'
        width={300}
        height={200}
      />
      <div className='flex flex-col items-center'>
        <p className='text-3xl font-black'>Oops!</p>
        <p className='text-2xl font-black'>Página no encontrada.</p>
        <p>La página que has solicitado no existe</p>
        <Link
          href='/login'
          className='flex items-center justify-center gap-1 bg-blue-500 text-white py-2 px-4 shadow-md rounded-md hover:bg-blue-600 transition-colors hover:cursor-pointer mt-4'
        >
          <ArrowLeftFromLine className='w-5 h-5' />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage