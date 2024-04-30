'use client'

import React from 'react'
import CompaniesView from './_components/companies-view'
import AddCompany from './_components/add-company-view';

function CompaniesPage() {

  const [showCompanies, setShowCompanies] = React.useState(false);

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
          <CompaniesView onShowForm={handleShowForm} />
        </div>
        :
        <AddCompany onBack={handleBack} />
      }
    </>
  )
}

export default CompaniesPage