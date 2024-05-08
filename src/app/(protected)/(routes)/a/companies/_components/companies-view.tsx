'use client'
import React, { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import FilterSearch from '../../_components/filter-search'
import CompaniesTable from './companies-table/companies-table'
import { Business } from '@/types/business'
import Link from 'next/link'
import { RemoveCovenant } from '@/actions/business/remove-convenant'

import { useCurrentUser } from '@/hooks/use-current-user'

interface CompaniesViewProps {
  business: Business[]
}

function CompaniesView({ business: data }: CompaniesViewProps) {
  const [business, setBusiness] = useState(data)
  const user = useCurrentUser()

  const handleAddCovenant = (company: string) => {
    console.log('add', company);

    // setBusiness(business.map(comp => {
    //   if (comp.id === company) {
    //     return {
    //       ...comp,
    //       hasCovenant: true
    //     }
    //   }
    //   return comp
    // }))
  }
  const handleRemoveCovenant = (id: string) => {
    RemoveCovenant(id, user?.accessToken!).then(() => {
      setBusiness(business.map(company => {
        if (company.id === id) {
          return {
            ...company,
            hasCovenant: false
          }
        }
        return company
      }))
    })
  }
  const companies = business.map((company) => {
    return {
      id: company.id,
      name: company.name,
      code: company.code.split("-")[0],
      agreement: company.hasCovenant ? 'Laboral' : 'Sin convenio',
      onAdd: handleAddCovenant,
      onRemove: handleRemoveCovenant
    }
  }
  )

  return (
    <section>
      <div className='flex flex-row justify-between items-center w-full mb-2'>
        <p className='font-semibold text-base '>Lista de empresas</p>
        <Link href='/a/companies/add-covenant'
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Agregar Empresa
        </Link>
      </div>
      <FilterSearch />
      <div className='mt-4'>
        <CompaniesTable data={companies} />
      </div>
    </section>
  )
}

export default CompaniesView