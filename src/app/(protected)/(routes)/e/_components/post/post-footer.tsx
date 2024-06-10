"use client"
import { createBookmark } from '@/actions/students/create-bookmark'
import { removeBookmark } from '@/actions/students/remove-bookmark'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { BookmarkCheck, BookmarkPlus, MessageCircleQuestion, Rocket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PostFooterProps {
  id: string
  isBookmarked?: boolean
}

const PostFooter = ({
  id,
  isBookmarked = false
}: PostFooterProps) => {
  const { execute: executeCreateBookmark } = useAction(createBookmark, {
    onSuccess: () => {
      console.log('success')
    }
  })
  const { execute: executeRemoveBookmark} = useAction(removeBookmark, {
    onSuccess: () => {
      console.log('success')
    }
  })
  const handleSave = async () => {
    if (isBookmarked) {
      await executeRemoveBookmark({ publicationId: id, path: '/e' })
    } else {
      await executeCreateBookmark({ publicationId: id, path: '/e' })
    }
  }
  return (
    <div className='flex justify-between items-center border-t-2 border-b-2 border-primary'>
      <div className='w-full'>
        <Link
          href={`/e/postulations/${id}`}
          className=' p-2 border-none text-primary hover:bg-blue-500/20 hover:text-primary w-full rounded-none flex items-center gap-1 justify-center transition-colors'
        >
          <Rocket className='w-5 h-5' />
          <span>Postular</span>
        </Link>
      </div>
      <div className='w-full'>
        <Link
          href={`/e/forum/${id}`}
          className=' p-2 border-none text-primary hover:bg-blue-500/20 hover:text-primary w-full rounded-none flex items-center gap-1 justify-center transition-colors'
        >
          <MessageCircleQuestion className='w-5 h-5' />
          <span>Ir al foro</span>
        </Link>
      </div>
      <div className='w-full'>
        <Button
          variant='link'
          onClick={handleSave}
          className=' p-2 border-none text-primary hover:bg-blue-500/20 hover:text-primary w-full rounded-none flex items-center gap-1 justify-center transition-colors hover:no-underline text-base'
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck className='w-5 h-5' />
              <span>Guardado</span>
            </>
          ): (
            <>
              <BookmarkPlus className='w-5 h-5' />
              <span>Guardar</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default PostFooter