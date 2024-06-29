"use client"

import React, { useEffect, useRef } from 'react'
import FormActionSubmit from './form-utilities/form-action-submit'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Image as ImageIcon, XCircle } from 'lucide-react'
import { useFormState } from 'react-dom'
import { updateImageProfile } from '@/actions/business/update-image-profile'
import Image from 'next/image'

type Action = (prevState: any, data: FormData) => {
  error: string;
  data?: undefined;
} | {
  data: {
    updated: boolean;
  };
  error?: undefined;
}

interface UploadImageProfileFormProps {
  children: React.ReactNode
  action: Action
}

const UploadImageProfileForm = ({
  children,
  action
}: UploadImageProfileFormProps) => {
  const [image, setImage] = React.useState<File | null>(null)
  const [state, formAction] = useFormState(action, {
    error: undefined,
    data: { updated: false }
  })
  const dialogClose = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    if (state.data?.updated) {
      setImage(null)
      dialogClose.current?.click()
    }
  }, [state.data?.updated])

  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <form action={formAction} className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Sube una nueva foto de perfil!</DialogTitle>
            <DialogDescription>Carga una nueva foto desde tus archivos locales</DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <Label htmlFor="image" className='flex flex-col justify-center items-center border border-dashed border-blue-700 cursor-pointer py-8'>
              {!image && (<ImageIcon className='w-20 h-20 stroke-blue-700' />)}
              {image && (
                <Image src={URL.createObjectURL(image)} alt='profile' width={128} height={128} className='w-32 h-32 object-cover rounded-full' />
              )}
              <Input id='image' type='file' name='image' accept='image/*'
                onChange={(e) => setImage(e.target.files && e.target.files[0])}
                className='border-none text-center w-auto  cursor-pointer'
                placeholder='...'
              />
            </Label>
            {
              state.error && (
                <p
                  className="text-xs font-medium text-destructive flex gap-1 items-center border border-rose-500 bg-rose-500/10 rounded-md p-1.5"
                >
                  <XCircle size={16} /> {state.error}
                </p>
              )
            }
          </div>
          <DialogFooter>
            <DialogClose ref={dialogClose} />
            <FormActionSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadImageProfileForm