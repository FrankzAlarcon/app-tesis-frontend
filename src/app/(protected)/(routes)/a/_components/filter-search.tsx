"use client"

import { Input } from '@/components/ui/input'
import { Filter, ChevronLeft, Check } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface FilterSearchProps {
  order: 'asc' | 'desc'
  handleChangeOrder: (order: 'asc' | 'desc') => void
  setValue: (value: string) => void
  showBackButton?: boolean
  backUrl?: string
}

function FilterSearch({
  showBackButton = false,
  backUrl,
  order,
  handleChangeOrder,
  setValue,
}: FilterSearchProps) {
  return (
    <div className='bg-[#E5E7EB] flex items-center p-2 rounded-md'>
      <div className='w-1/4 h-5/6 '>
        {showBackButton && (
          <Link
            href={backUrl ?? '/a/dashboard'}
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            <ChevronLeft size={20} />
            <p className='text-sm'>Regresar</p>
          </Link>
        )}
      </div>
      <div className='flex items-center justify-end gap-4 w-3/4 h-full'>
        <div className='h-full'>
          <Input
            placeholder='Buscar por el nombre'
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='flex items-center justify-center gap-2'>
              <Filter size={20} />
              <span className='text-sm'>Filtros</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Button variant='outline' className='w-full border-none rounded-none cursor-pointer flex justify-center items-center gap-2' onClick={() => handleChangeOrder('desc')}>
                  <span>Más reciente primero</span>
                  {order === 'desc' && (
                    <Check className='w-3 h-3 text-primary' />
                  )}
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button variant='outline' className='w-full border-none rounded-none cursor-pointer flex justify-center items-center gap-2' onClick={() => handleChangeOrder('asc')}>
                  <span>Más antiguo primero</span>
                  {order === 'asc' && (
                    <Check className='w-3 h-3 text-primary' />
                  )}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default FilterSearch