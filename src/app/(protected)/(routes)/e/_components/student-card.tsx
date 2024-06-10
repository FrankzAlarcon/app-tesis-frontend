import React from 'react'
import Link from 'next/link'
import { getProfile } from '@/actions/students/get-profile'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface CompleteFormMenuProps {
  children: React.ReactNode
  asChild?: boolean
}

const CompleteFormMenu = ({
  children,
  asChild = false
}: CompleteFormMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={asChild}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='p-0'>
          <Link
            href='/e/registration-preprofesional-practices'
            className='w-full h-full p-2 hover:bg-black/5 transition-colors'
          >Registro de prácticas preprofesionales</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <Link
            href='/e/registration-convalidation-preprofesional-practices'
            className='w-full h-full p-2 hover:bg-black/5 transition-colors'
          >Convalidación de prácticas preprofesionales</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

async function StudentCard() {
  const profile = await getProfile()
  if (!profile) return (<div>Loading...</div>)
  const { name, faculty, ira } = profile
  return (
    <div className='w-full md:h-[30rem] lg:h-[23rem] bg-white rounded-xl'>
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
                className='py-1.5 rounded-lg h-auto border-primary text-primary w-full hover:cursor-pointer hover:!bg-blue-500/10 hover:text-primary'
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
          <CompleteFormMenu asChild>
            <Button
              size='xs'
              variant='outline'
              className='py-1.5 rounded-lg h-auto border-primary text-primary w-full flex gap-1 items-center hover:cursor-pointer hover:!bg-blue-500/10 hover:text-primary'
            >
              <span>Completar formulario</span>
              <ChevronDown className='h-4 w-4' />
            </Button>
          </CompleteFormMenu>
        </div>
      </div>
    </div>
  )
}

export default StudentCard