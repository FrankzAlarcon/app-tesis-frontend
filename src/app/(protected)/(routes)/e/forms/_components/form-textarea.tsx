"use client"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import React from 'react'

interface FormTextareaProps {
  id: string
  name: string
  placeholder?: string
  value?: string
  setValue?: (value: string) => void
  className?: string
  disabled?: boolean
}

const FormTextarea = ({
  id,
  name,
  placeholder,
  value,
  setValue,
  className,
  disabled = false
}: FormTextareaProps) => {
  return (
    <div className={cn(
      'relative',
      className
    )}>
      <Label
        htmlFor={id}
        className='absolute z-30 -top-2.5 left-3 text-sm font-bold bg-white px-1'
      >
        {name}
      </Label>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => setValue && setValue(e.target.value)}
        className='placeholder:text-xs'
        disabled={disabled}
      />
    </div>
  )
}

export default FormTextarea