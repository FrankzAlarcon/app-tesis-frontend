'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import FilterSearch from '../../_components/filter-search'
import CompaniesTable from './companies-table/companies-table'
import { Business } from '@/types/business'
import Link from 'next/link'

interface CompaniesViewProps {
  business: Business[]
}

function CompaniesView({ business: data }: CompaniesViewProps) {
  const [business, setBusiness] = useState(data)
  console.log(business)
  return (
    <section>
      <div className='flex flex-row justify-between items-center w-full mb-2'>
        <p className='font-semibold text-base '>Lista de empresas</p>
        <Link href= '/a/companies/add-covenant'
          className='hover:bg-blue-700/90 rounded-lg'
        >
          Agregar Empresa
        </Link>
      </div>
      <FilterSearch />
      <div className='mt-4'>
        <CompaniesTable />
      </div>
    </section>
  )
}

export default CompaniesView