import React from 'react'
import PostFooter from './post-footer'
import PostHeader from './post-header'
import { Post } from '@/types/post'
import { formatMoney } from '@/lib/format-money'
import SafeHTML from '@/components/safe-html'
import Image from 'next/image'

interface PostProps {
  post: Post
  noFooter?: boolean
}

const Posts = ({
  post,
  noFooter = false
}: PostProps) => {
  return (
    <article className='h-auto w-full bg-white p-2 flex flex-col gap-2'>
      <PostHeader name={post.business.name} image={post.business.imageUrl} createdAt={post.createdAt} />
      <div className='text-sm px-2'>
        <p className='font-bold'>{post.title}</p>
        <SafeHTML>{post.description}</SafeHTML>
        <div>
          <p className='font-bold'>Requisitos</p>
          <SafeHTML>{post.requirements}</SafeHTML>
        </div>
        <div>
          <p className='font-bold'>Beneficios</p>
          <SafeHTML>{post.benefits}</SafeHTML>
        </div>
        <div className='flex gap-1'>
          <p className='font-bold'>Modalidad:</p>
          <p>{post.modality}</p>
        </div>
        <div className='flex gap-1'>
          <p className='font-bold'>Remuneración:</p>
          <p>{formatMoney(post.remuneration)}</p>
        </div>
        {post.imageUrl && (
          <Image src={post.imageUrl} width={320} height={160} alt='Imagen de la publicación' className='w-full h-auto max-h-64 object-contain' />
        )}
      </div>
      {!noFooter && (<PostFooter id={post.id} isBookmarked={post.bookmarked} />)}
    </article>
  )
}

export default Posts