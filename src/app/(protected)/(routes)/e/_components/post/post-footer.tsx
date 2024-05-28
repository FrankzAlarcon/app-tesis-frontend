import { BookmarkPlus, MessageCircleQuestion, Rocket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PostFooterProps {
  id: string
}

const PostFooter = ({
  id
}: PostFooterProps) => {
  return (
    <div className='flex justify-between items-center border-t-2 border-b-2 border-primary'>
      <div className='w-full'>
        <Link
          href={`/postulation/${id}`}
          className=' p-2 border-none text-primary hover:bg-blue-500/20 hover:text-primary w-full rounded-none flex items-center gap-1 justify-center transition-colors'
        >
          <Rocket className='w-5 h-5' />
          <span>Postular</span>
        </Link>
      </div>
      <div className='w-full'>
        <Link
          href={`/forum/${id}`}
          className=' p-2 border-none text-primary hover:bg-blue-500/20 hover:text-primary w-full rounded-none flex items-center gap-1 justify-center transition-colors'
        >
          <MessageCircleQuestion className='w-5 h-5' />
          <span>Ir al foro</span>
        </Link>
      </div>
      <div className='w-full'>
        <Link
          href={`/bookmark/${id}`}
          className=' p-2 border-none text-primary hover:bg-blue-500/20 hover:text-primary w-full rounded-none flex items-center gap-1 justify-center transition-colors'
        >
          <BookmarkPlus className='w-5 h-5' />
          <span>Guardar</span>
        </Link>
      </div>
    </div>
  )
}

export default PostFooter