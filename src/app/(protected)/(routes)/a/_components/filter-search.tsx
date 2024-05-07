import React from 'react'

import { Input } from '@/components/ui/input'
import { Filter, FilterX, Search, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface FilterSearchProps {
  showBackButton?: boolean
  backUrl?: string
}


function FilterSearch({ showBackButton = false, backUrl }: FilterSearchProps) {
  return (
    <div className='h-12 bg-[#E5E7EB] flex items-center p-2 rounded-md'>
      <div className='w-1/4 h-5/6 '>
        {showBackButton && (
          <Link
            href={backUrl ?? '/a/dashboard'}
            className='flex flex-row justify-center hover:bg-white border text-primary border-primary items-center gap-1 bg-white h-full w-1/2 rounded-lg '
          >
            <ChevronLeft size={20} />
            <p className='text-sm'>Regresar</p>
          </Link>
        )}
      </div>
      <div className='flex items-center justify-end gap-4 w-3/4 h-full'>
        <div className='h-full'>
          <Input
            // placeholder={<><Search size={16} /> Buscar</>}
            placeholder='Buscar'
            className='h-full w-full pl-4 rounded-lg'
          />
        </div>
        <button className='flex flex-row justify-center items-center gap-1 bg-white h-full rounded-lg w-2/12 '>
          <Filter size={20} />
          <span className='text-gray-400 text-sm'>Filtros</span>
        </button>
      </div>
    </div>
  )
}

export default FilterSearch