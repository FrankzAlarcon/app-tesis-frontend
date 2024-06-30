'use client'
import { Button } from '@/components/ui/button'
import React from 'react'


interface CompanyCardProps {
  id: string
  name: string
  description: string | null
  location: string | null
  logo: string
  hasConvenant: boolean
  onAdd: (index: string) => void
  onVisit: (index: string) => void
  onDelete: (index: string) => void
}

function CompanyCard({ id, name, description, location, logo, hasConvenant, onAdd, onVisit, onDelete }: CompanyCardProps) {

  return (
    <div className='w-[400px] h-[140px] dashboard-container-shadow p-3 '>
      <div className='h-full w-full flex flex-row gap-2 '>
        <div className='flex items-center h-full w-2/5'>
          <img src={logo} alt='logo' className='w-28 object-cover' />
        </div>
        <div className='flex flex-col justify-between w-full' >
          <div className='px-3'>
            <p className='font-semibold text-lg'>{name}</p>
            <p className='text-xs'>{description}</p>
            <p className='font-semibold text-sm'>{location}</p>
          </div>
          <div className='flex flex-row justify-between w-full px-2'>
            {!hasConvenant ? (
              <Button size='xs'
                className='hover:bg-blue-700/90 rounded-lg'
                onClick={() => onAdd(id)}
                disabled={hasConvenant}
              >
                Agregar convenio
              </Button>
            ) : (
              <Button size='xs'

                onClick={() => onDelete(id)}
                variant={'destructive'}
              >
                Quitar convenio
              </Button>
            )}
            <Button size='xs'
              className='rounded-lg border-primary text-primary hover:text-primary'
              onClick={() => onVisit(id)}
              variant={'outline'}
            >
              Ver pagina
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard