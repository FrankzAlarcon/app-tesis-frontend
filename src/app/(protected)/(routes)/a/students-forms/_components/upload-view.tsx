'use client'

import React from 'react'
import FileUpload from './file-multiple-input/file-upload'
import { Button } from '@/components/ui/button'

interface UploadViewProps {
  onBack: () => void
}

function UploadView({ onBack }: UploadViewProps) {
  return (
    <section className='h-full relative'>
      <p className='font-semibold text-base '>Subir formularios aprobados</p>
      <FileUpload />
      <Button
        size='sm'
        variant='outline'
        className='absolute -bottom-2 border-primary text-primary'
        onClick={onBack}
      >
        Regresar
      </Button>

    </section>
  )
}

export default UploadView