import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface PostProps {
  title: string
  content: string
  date: string
  autor: {
    name: string
    // avatar: string
  }
  img?: string
  match?: boolean
}


import {
  MessageCircleQuestion,
  BookmarkPlus,
  Rocket,

} from 'lucide-react'

function Post({ title, content, date, autor, img, match }: PostProps) {
  return (
    <article className='min-h-[500px] w-full flex flex-col justify-between bg-white py-4 px-3 rounded-[10px] relative'>
      {match &&
        <div className=' absolute -top-2 right-0 bg-primary text-white p-2 rounded-tr-[10px] rounded-bl-[10px]'>
          <p className='font-semibold text-sm'>Coincide con tu perfil</p>
        </div>
      }
      <div className=''>
        <div className='flex flex-row gap-2 items-center'>
          <Avatar
            className='w-12 h-12'
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className='font-semibold'>{autor?.name}</p>
            <p className='text-secondary-foreground text-xs '>{date}</p>
          </div>
        </div>
        <div className='px-4 my-4'>
          <h4 className='text-black font-bold text-base'>{title}</h4>
          <div>
            <p className='text-sm'>{content}</p>
          </div>
        </div>
        {img &&
          <div className='flex justify-center items-center'>
            <img src={img} className='object-cover h-36' />
          </div>
        }
      </div>

      <nav className='flex flex-row justify-between px-8 border-y border-primary py-2'>
        <div className='flex flex-row gap-2 justify-center items-center text-primary'>
          <Rocket className='h-6 w-6' />
          <span>Postular</span>
        </div>
        <div className='flex flex-row gap-2 justify-center items-center text-primary'>
          <MessageCircleQuestion className='h-6 w-6' />
          <span>Ir al foro</span>
        </div>
        <div className='flex flex-row gap-2 justify-center items-center text-primary'>
          <BookmarkPlus className='h-6 w-6' />
          <span>Guardar</span>
        </div>
      </nav>

    </article >
  )
}

export default Post