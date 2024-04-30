'use client'
import React from 'react'
import FilterSearch from '../../_components/filter-search'
import CompanyCard from './company-card'
import { Button } from '@/components/ui/button'

interface AddCompanyProps {
  onBack: () => void
}

const companies = [
  {
    id: 1,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 2,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 3,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 4,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 5,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 6,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 7,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 8,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  },
  {
    id: 9,
    name: 'Kushki',
    description: 'Servicios financieros',
    location: 'Quito',
    logo: '/agrements-companies/kushki_logo.jpg'
  }
]

function AddCompany({ onBack }: AddCompanyProps) {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState<number | null>(null);

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
                  onClick={() => console.log('Adding company')}
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
        <FilterSearch showBackButton onBack={onBack} />
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
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AddCompany