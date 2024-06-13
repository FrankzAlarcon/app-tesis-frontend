import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React from 'react'

interface FormInputProps {
  id: string
  name: string
  type: string
  placeholder: string
  className?: string
}

const FormInput = ({
  id,
  name,
  type,
  placeholder,
  className
}: FormInputProps) => {
  return (
    <div className={cn(
      'relative',
      className
    )}>
      <Label
        htmlFor={id}
        className='absolute -top-2.5 left-3 text-sm font-bold bg-white px-1'
      >
        {name}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className='placeholder:text-xs'
      />
    </div>
  )
}

export default FormInput