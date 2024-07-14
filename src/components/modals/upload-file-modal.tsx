"use client"

import { ReactNode, useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { InputFile } from '../inputs/input-file'
import { XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import Loader from '../loader'
import { useToast } from '../ui/use-toast'

interface UploadFileModalProps {
  children: ReactNode
  alertTitle: string
  alertDescription: string
  files: File[]
  setFiles: (files: File[]) => void
  alertCancelText?: string
  alertConfirmText?: string
  onConfirm: () => boolean | Promise<boolean>
  asChild?: boolean
  className?: string
  error?: string | null
  setError?: (error: string | null) => void
}

const UploadFileModal = ({
  children,
  alertTitle,
  alertDescription,
  alertConfirmText,
  alertCancelText,
  className,
  asChild = false,
  error,
  files,
  setFiles,
  setError,
  onConfirm
}: UploadFileModalProps) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const dialogClose = useRef<HTMLButtonElement>(null)

  const handleSelectFiles = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setError?.(null)
  }

  const handleClick = async () => {
    setIsLoading(true)
    const withNoError = await onConfirm()
    setIsLoading(false)
    if (withNoError) {
      toast({
        title: 'Formulario subido correctamente',
        description: 'El formulario se ha subido correctamente, espera a que sea revisado por la EPN.',
        variant: 'default'
      })
      setOpen(false)
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        setOpen(!open)
        setFiles([])
      }}
    >
      <AlertDialogTrigger asChild={asChild} className={className}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription className='text-xs'>
              {alertDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='space-y-2'>
            <InputFile
              name='file'
              files={files}
              handleSelectFiles={handleSelectFiles}
              accept='application/pdf'
              className='flex w-full h-60 border-dashed border-primary border-2 rounded-lg p-4 mt-4'
              inputClassName='hidden'
            />
            {
              error && (
                <p
                  className="text-xs font-medium text-destructive flex gap-1 items-center border border-rose-500 bg-rose-500/10 rounded-md p-1.5"
                >
                  <XCircle size={16} /> {error}
                </p>
              )
            }
          </div>
          <AlertDialogFooter className='pt-2'>
            <AlertDialogCancel ref={dialogClose} >{alertCancelText ? alertCancelText : 'Cancelar'}</AlertDialogCancel>
            <Button onClick={handleClick} disabled={isLoading}>
              {
                isLoading ? (
                  <Loader className='text-white h-5 w-5' />
                ) : (
                  alertConfirmText ? alertConfirmText : 'Subir Archivo(s)'
                )
              }
            </Button>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UploadFileModal