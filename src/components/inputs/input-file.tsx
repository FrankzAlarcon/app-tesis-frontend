"use client"

import React, { useCallback, useRef } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { FileDown, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  files: File[]
  handleSelectFiles: (files: File[]) => void
  className?: string
  inputClassName?: string
  placeholder?: string
  accept?: string
  multiple?: boolean
  withContent?: boolean
}

const InputFile = ({
  className,
  inputClassName,
  placeholder = 'Selecciona un archivo(s)',
  accept = 'application/pdf',
  multiple = false,
  withContent = true,
  files,
  handleSelectFiles,
  ...props
}: InputFileProps) => {
  const onChange = useCallback((files: File[]) => {
    console.log(files)
    handleSelectFiles(files)
  }, [handleSelectFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: (acceptedFiles) => {
    onChange(acceptedFiles)
  } })
  return (
    <div
      className={cn('flex items-center justify-center ', className)}
      {...getRootProps()}
    >
      {
        withContent && (
          <div className='flex flex-col items-center justify-center'>
            {
              isDragActive && files.length === 0 && (
                <div className='text-primary flex flex-col items-center justify-center gap-2'>
                  <FileDown className='w-32 h-32 text-primary' />
                  <p className='text-xs'>Suelta los archivos aquí...</p>
                </div>
              ) 
            }

            {
              !isDragActive && files.length === 0 && (
                (
                  <div className='text-primary flex text-xs flex-col justify-center items-center'>
                    <Upload className='w-36 h-36 text-primary' />
                    <p>Selecciona el archivo que vas a subir</p>
                    <p>o</p>
                    <p>Arrastra y suelta el archivo</p>
                  </div>
                )
              )
            }

            {
              !isDragActive && files.length > 0 && (
                <div className='flex flex-col justify-center items-center gap-2 text-primary'>
                  <p className=''>Archivo(s) seleccionados</p>
                  <ul className='flex flex-col gap-2'>
                    {
                      files.map((file, index) => (
                        <li key={index} className='flex gap-2 items-center'>
                          <span className='text-sm'>{file.name}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
          </div>
        )
      }
      <Input
        type="file"
        accept={accept}
        multiple={multiple}
        placeholder={placeholder}
        className={cn('', inputClassName)}
        onChange={(e) => {
          if (e.target.files) {
            onChange(Array.from(e.target.files))
          }
        }}
        {...props}
        {...getInputProps()}
      />
    </div>
  )
}

export { InputFile }