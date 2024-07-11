"use client"

import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface InputFileProps {
  className?: string
  inputClassName?: string
  placeholder?: string
  accept?: string
  multiple?: boolean
}

const InputFile = ({
  className,
  inputClassName,
  placeholder = 'Selecciona un archivo(s)',
  accept = 'application/pdf',
  multiple = false
}: InputFileProps) => {
  return (
    <Label className={cn('', className)}>
      <Input
        type="file"
        accept={accept}
        multiple={multiple}
        placeholder={placeholder}
        className={cn('', inputClassName)}
      />
    </Label>
  )
}

export default InputFile