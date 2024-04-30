'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import FilterSearch from '../../_components/filter-search'
import CompaniesTable from './companies-table/companies-table'

interface CompaniesViewProps {
  onShowForm: () => void
}

function CompaniesView({ onShowForm }: CompaniesViewProps) {
  return (
    <section>
      <div className='flex flex-row justify-between items-center w-full mb-2'>
        <p className='font-semibold text-base '>Lista de empresas</p>
        <Button
          size='sm'
          className='hover:bg-blue-700/90 rounded-lg'
          onClick={onShowForm}
        >
          Agregar Empresa
        </Button>
      </div>
      <FilterSearch />
      <div className='mt-4'>
        <CompaniesTable />
      </div>
    </section>
  )
}

export default CompaniesView