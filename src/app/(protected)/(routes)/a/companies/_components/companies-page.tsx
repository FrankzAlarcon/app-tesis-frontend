'use client'

import CompaniesView from './companies-view'
import AddCompany from './add-company-view';
import { useState } from 'react';
import { Business } from '@/types/business';

interface CompaniesPageProps {
  businesses: Business[]
}


function CompaniesPageComponent({
  businesses: data
}: CompaniesPageProps) {
  const [businesses, setBusinesses] = useState(data)
  const [showCompanies, setShowCompanies] = useState(false);
  console.log(businesses)
  const handleShowForm = () => {
    setShowCompanies(true);
  }
  const handleBack = () => {
    setShowCompanies(false);
  }
  return (
    <>
      {!showCompanies
        ?
        <div className='w-11/12 h-5/6 dashboard-container-shadow p-4'>
          {/* <CompaniesView onShowForm={handleShowForm} /> */}
        </div>
        :
        <AddCompany />
      }
    </>
  )
}

export default CompaniesPageComponent