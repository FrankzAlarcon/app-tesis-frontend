import React from 'react'
import PostFooter from './post-footer'
import PostHeader from './post-header'
import { Post } from '@/types/post'
import { formatMoney } from '@/lib/format-money'

interface PostProps {
  post: Post
}

const Posts = ({
  post
}: PostProps) => {
  return (
    <article className='h-auto w-full bg-white p-2 flex flex-col gap-2'>
      <PostHeader name={post.business.name} createdAt={post.createdAt} />
      <div className='text-sm px-2'>
        <p className=''>{post.description}</p>
        <div>
          <p className='font-bold'>Requisitos</p>
          <ul>
            {
              post.requirements.split('\n').map((requirement) => (
                <li className='list-disc ml-4' key={requirement}>{requirement}</li>
              ))
            }
          </ul>
        </div>
        <div>
          <p className='font-bold'>Beneficios</p>
          <ul>
            {
              post.benefits.split('\n').map((benefit) => (
                <li className='list-disc ml-4' key={benefit}>{benefit}</li>
              ))
            }
          </ul>
        </div>
        <div className='flex gap-1'>
          <p className='font-bold'>Modalidad:</p>
          <p>{post.modality}</p>
        </div>
        <div className='flex gap-1'>
          <p className='font-bold'>Remuneración:</p>
          <p>{formatMoney(post.remuneration)}</p>
        </div>
        
      </div>
      <PostFooter id={post.id} />
    </article>
  )
}

export default Posts