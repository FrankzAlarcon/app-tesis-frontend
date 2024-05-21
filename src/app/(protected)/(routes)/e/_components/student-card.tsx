import { getProfile } from '@/actions/students/get-profile'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import Link from 'next/link'

async function StudentCard() {
  const profile = await getProfile()
  if (!profile) return (<div>Loading...</div>)
  const { name, faculty, ira } = profile
  return (
    <article className='w-full md:w-64 h-[23rem] bg-white rounded-xl'>
      <div className='h-1/6 w-full bg-[#A0B4B7] rounded-t-xl '></div>
      <div className='relative px-6'>
        <div className='flex w-full justify-center'>
          <Avatar className=' w-12 h-12 z-10 absolute -top-8 md:w-16 md:h-16'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <section className='text-center pt-10 flex flex-col gap-1'>
          <h4 className='text-black font-bold text-base'>{name}</h4>
          <p className='text-secondary-foreground text-sm'>{faculty}</p>
          <div className='flex justify-between'>
            <p className='text-secondary-foreground text-sm'>9no semestre</p>
            <p className='text-secondary-foreground text-sm'>N° Créditos 110</p>
          </div>
        </section>
        <div className='flex flex-col gap-4 mt-4'>
          <div className='flex justify-center'>
            <Link href='e/profile'>
              <Button
                variant={'outline'}
                size={'xs'}
                className='border-primary text-primary'
              >
                Ver mi perfil
              </Button>
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <Badge className='bg-[#EEF7FE]'>
              <div className='w-full py-1 flex flex-row justify-between px-2'>
                <span className='text-[#6B7280]'>Postulaciones actuales</span>
                <span className='text-primary'>5</span>
              </div>
            </Badge>
            <Badge className='bg-[#EEF7FE]'>
              <div className='w-full py-1 flex flex-row justify-between px-2'>
                <span className='text-[#6B7280]'>Empresas que te buscan</span>
                <span className='text-primary'>2</span>
              </div>
            </Badge>
          </div>
          <Button
            variant='outline'
            size='xs'
            className='border-primary text-primary'
          >
            Seguimineto de practicas
          </Button>
        </div>
      </div>
    </article>
  )
}

export default StudentCard