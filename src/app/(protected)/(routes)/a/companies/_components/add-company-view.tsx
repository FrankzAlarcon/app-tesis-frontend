'use client'
import React from 'react'
import FilterSearch from '../../_components/filter-search'
import CompanyCard from './company-card'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/router'
import { AddCovenant } from '@/actions/business/add-covenant'
import { useCurrentUser } from '@/hooks/use-current-user'


interface AddCompanyProps {
  companies: any[]
}


function AddCompany({ companies: data }: AddCompanyProps) {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState<number | null>(null);
  const [companies, setCompanies] = React.useState(data);
  const user = useCurrentUser()


  const handleAddCovenant = () => {
    const today = new Date();
    // calculate the date of the next month
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    const data = {
      businessId: selectedCompany,
      covenantType: 'laboral',
      startDate: today,
      endDate: nextMonth
    }
    AddCovenant(data, user?.accessToken!)
      .then(() => {
        console.log('Company added');
        setCompanies(companies.map(company => {
          if (company.id === selectedCompany) {
            return {
              ...company,
              hasConvenant: true
            }
          }
          return company;
        })
        );
        setShowAlertDialog(false);
        // navigate.push('/a/companies');

      })
      .catch(err => {
        console.error(err)
      })
  }


  const handleAddCompany = (id: number) => {
    setSelectedCompany(id);
    setShowAlertDialog(true);
  }

  return (
    <section className='w-full h-full p-10'>
      {showAlertDialog && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center'>
          <div className='bg-white pb-4 rounded-3xl w-[450px]'>
            <div className='bg-primary text-white text-center w-full rounded-t-3xl p-3'>
              <p className='text-lg font-semibold'>
                Estás apunto de agregar a {selectedCompany && companies.find(company => company.id === selectedCompany)?.name} como un nuevo convenio. ¿Estás seguro?
              </p>
            </div>
            <div className='flex flex-col justify-center w-full'>
              <p className='text-center text-secondary-foreground text-sm px-8 py-2'>
                {selectedCompany && companies.find(company => company.id === selectedCompany)?.name} aparecerá en tu lista de empresas y podrás obtener las estadísticas específicas sobre los estudiantes que han realizado prácticas aquí y su experiencia.
              </p>
              <div className='flex flex-row w-full px-10 justify-between mt-4'>
                <Button
                  size='sm'
                  className='bg-primary rounded-xl px-8 hover:bg-blue-700/90'
                  onClick={handleAddCovenant}
                >
                  Agregar
                </Button>
                <Button
                  size='sm'
                  variant={'outline'}
                  className='border-primary text-primary rounded-xl px-8'
                  onClick={() => setShowAlertDialog(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='h-full flex flex-col gap-4'>
        <FilterSearch showBackButton backUrl='/a/companies' />
        <div className='grid grid-cols-2 overflow-y-auto p-3 gap-y-4'>
          {companies.map(company => (
            <CompanyCard
              key={company.id}
              name={company.name}
              description={company.description}
              location={company.location}
              logo={company.logo}
              id={company.id}
              onAdd={handleAddCompany}
              onVisit={() => console.log('Visiting company')}
              hasConvenant={company.hasConvenant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AddCompany