import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React from 'react'

interface FormInputProps {
  id: string
  name: string
  type: string
  placeholder?: string
  value?: string
  setValue?: (value: string) => void
  className?: string
  disabled?: boolean
}

const FormInput = ({
  id,
  name,
  type,
  placeholder,
  value,
  setValue,
  className,
  disabled = false
}: FormInputProps) => {
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
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => setValue && setValue(e.target.value)}
        className='placeholder:text-xs'
        disabled={disabled}
      />
    </div>
  )
}

export default FormInput