"use client"

import TipTapEditor from '@/components/tip-tap-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'


const NewForum = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <div className='space-y-4'>
      <div>
        <Label id='title'>Título de tu opinión</Label>
        <Input
          id='title'
          name='title'
          placeholder='Coloca el titulo de tu opinión'
          className='w-full'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <TipTapEditor content={content} />
      </div>
      <div className='w-full flex justify-center'>
        <Button
          onClick={() => console.log('Enviar')}
        >
          Enviar opinión
        </Button>
      </div>
    </div>
  )
}

export default NewForum