"use client"

import { createForum } from '@/actions/students/create-forum'
import ConfirmDialog from '@/components/confirm-dialog'
import FormError from '@/components/form-utilities/form-error'
import Loader from '@/components/loader'
import TipTapEditor from '@/components/tip-tap-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAction } from '@/hooks/use-action'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface NewForumProps {
  businessId: string
}

const NewForum = ({
  businessId
}: NewForumProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [grade, setGrade] = useState(3)
  const [error, setError] = useState('')
  const router = useRouter()
  const { execute, isLoading } = useAction(createForum, {
    onError: (error) => setError(error),
    onSuccess: () => {
      router.push(`/e/forum/${businessId}`)
      setError('')
      setTitle('')
      setContent('')
    }
  })

  const onConfirm = async () => {
    if ([title, content, businessId].includes('')) {
      setError('Faltan campos por llenar')
      return
    }
    await execute({ title, description: content, grade, businessId })
  }

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
        <Label id='title'>Descripción</Label>
        <TipTapEditor content={content} setContent={setContent} />
      </div>
      <div className='flex items-center'>
        <Label id='title'>Calificación: </Label>
        {
          [1, 2, 3, 4, 5].map((gradeItem) => (
            <Button
              key={gradeItem}
              size='xs'
              variant='ghost'
              onClick={() => setGrade(gradeItem)}
            >
              <Star className={cn('w-5 h-5',
                grade >= gradeItem && 'text-black fill-amber-500'
              )}  />
            </Button>
          ))
        }
      </div>
      {!!error && <FormError error={error} />}
      <div className='md:flex md:justify-end'>
        <ConfirmDialog
          asChild
          alertTitle='Publicar opinión'
          alertDescription='¿Estás seguro de publicar tu opinión?'
          onConfirm={onConfirm}
        >
          <Button className='btn btn-primary w-full md:w-auto'
            disabled={[title, content].includes('')}
          >
            {isLoading ? (
              <Loader className='text-white h-5 w-5' />
            ) : 'Publicar opinión'}
          </Button>
        </ConfirmDialog>
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