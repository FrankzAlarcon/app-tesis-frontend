'use client'

import React from 'react'

import StudentsTable from './students-table'
import FilterSearch from '../../_components/filter-search'
import { Button } from '@/components/ui/button'

interface FormsViewProps {
  onShowForm: () => void
}


function FormsView({ onShowForm }: FormsViewProps) {
  return (
    <section>
      <div className='flex flex-row justify-between items-center w-full mb-2'>
        <p className='font-semibold text-base '>Formularios recibidos</p>
        <Button
          size='sm'
          className='hover:bg-blue-700/90 rounded-lg'
          onClick={onShowForm}
        >
          Subir formularios
        </Button>
      </div>
      <FilterSearch />
      <div className='mt-4'>
        <StudentsTable />
      </div>
    </section>
  )
}

export default FormsView