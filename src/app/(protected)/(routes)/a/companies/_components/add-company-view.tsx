'use client'

import FilterSearch from '../../_components/filter-search'
import CompanyCard from './company-card'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { useToast } from '@/components/ui/use-toast'
import { createConvenant } from '@/actions/business/create-convenant'
import { removeCovenant, } from '@/actions/business/remove-convenant'
import { useEffect, useMemo, useState } from 'react'
import { getAllBusiness } from '@/actions/admin/get-business'
import { useDebounceValue } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'

function AddCompany() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { toast } = useToast()
  const router = useRouter()
  const [debouncedValue, setDebouncedValue] = useDebounceValue<string>('', 800)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const { data, isLoading: isLoadingAllBusiness, execute: executeAllBusiness} = useAction(getAllBusiness, {})
  const companies = useMemo(() => {
    if (!data || !data.data || data.data.length === 0) return []
    return data.data
  }, [data])
  const { execute: executeConvenant, resetValues: resetValuesConvenant } = useAction(createConvenant, {
    onError: () => {
      toast({
        title: 'Error al agregar la empresa',
        duration: 4000,
        description: 'Ha ocurrido un error al intentar agregar la empresa. Por favor, inténtalo de nuevo.',
      })
    },
    onSuccess: () => {
      resetValuesConvenant()
      toast({
        title: 'Empresa agregada',
        duration: 4000,
        description: 'La empresa ha sido agregada correctamente.',
      })
    }
  })
  const { execute, resetValues, isLoading } = useAction(removeCovenant, {
    onError: () => {
      toast({
        title: 'Error al eliminar la empresa',
        duration: 4000,
        description: 'Ha ocurrido un error al intentar eliminar la empresa. Por favor, inténtalo de nuevo.',
      })
    },
    onSuccess: () => {
      resetValues()
      toast({
        title: 'Empresa eliminada',
        duration: 4000,
        description: 'La empresa ha sido eliminada correctamente.',
      })
    }
  })

  useEffect(() => {
    if (!debouncedValue.trim()) {
      executeAllBusiness({
        limit: 10,
        offset: 0,
      })
      return
    }
    executeAllBusiness({
      limit: 10,
      offset: 0,
      filterField: 'name',
      filterValue: debouncedValue,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const handleChangeOrder = (order: 'asc' | 'desc') => {
    setOrder(order)
    executeAllBusiness({
      limit: 10,
      offset: 0,
      filterField: 'name',
      filterValue: debouncedValue,
      orderField: 'createdAt',
      orderDirection: order,
    })
  }

  const handleDeleteConvenant = async () => {
    await execute({ convenantId: selectedCompany! })
    setShowDeleteDialog(false);
  }

  const handleAddCovenant = () => {
    const today = new Date();
    // calculate the date of the next month
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    //convert to string date
    const startDate = today.toISOString()
    const endDate = nextMonth.toISOString()

    const data = {
      businessId: selectedCompany!,
      covenantType: 'laboral',
      startDate: startDate,
      endDate: endDate,
    }
    executeConvenant(data);

  }

  const handleAddCompany = (id: string) => {
    setSelectedCompany(id);
    setShowAlertDialog(true);
  }

  const handleDeleteCompany = (id: string) => {
    setSelectedCompany(id);
    setShowDeleteDialog(true);
  }

  const onVisit = (businessId: string) => {
    router.push(`/a/profile/b/${businessId}`)
  }

  return (
    <section className='w-full h-full p-10' >
      {showAlertDialog && (
        <div className='fixed z-30 inset-0 bg-black/50 flex justify-center items-center'>
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Agregando...' : 'Agregar'}
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
      {showDeleteDialog && (
        <div className='fixed z-30 inset-0 bg-black/50 flex justify-center items-center'>
          <div className='bg-white pb-4 rounded-3xl w-[450px]'>
            <div className='bg-destructive text-white text-center w-full rounded-t-3xl p-3'>
              <p className='text-lg font-semibold'>
                Estás apunto de eliminar a {selectedCompany && companies.find(company => company.id === selectedCompany)?.name} como un convenio. ¿Estás seguro?
              </p>
            </div>
            <div className='flex flex-col justify-center w-full'>
              <p className='text-center text-secondary-foreground text-sm px-8 py-2'>
                {selectedCompany && companies.find(company => company.id === selectedCompany)?.name} será eliminado de tu lista de empresas y no podrás obtener las estadísticas específicas sobre los estudiantes que han realizado prácticas aquí y su experiencia.
              </p>
              <div className='flex flex-row w-full px-10 justify-between mt-4'>
                <Button
                  size='sm'
                  className='bg-destructive rounded-xl px-8 hover:bg-destructive/90'
                  onClick={handleDeleteConvenant}
                >
                  Eliminar
                </Button>
                <Button
                  size='sm'
                  variant={'outline'}
                  className='border-destructive text-destructive hover:text-destructive rounded-xl px-8'
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='h-full flex flex-col gap-4'>
        <FilterSearch
          showBackButton
          backUrl='/a/companies'
          handleChangeOrder={handleChangeOrder}
          order={order}
          setValue={setDebouncedValue}
        />
        {
          isLoadingAllBusiness ? (
            <div className='w-full flex justify-center'>
              <Loader />
            </div>
          ) : (
            <div className='grid grid-cols-2 overflow-y-auto p-3 gap-y-4'>
              {companies.map(company => (
                <CompanyCard
                  logo={company.imageUrl}
                  key={company.id}
                  name={company.name}
                  description={company.shortPresentation}
                  location={company.province}
                  id={company.id}
                  onAdd={handleAddCompany}
                  onDelete={handleDeleteCompany}
                  onVisit={onVisit}
                  hasConvenant={company.hasCovenant}
                />
              ))}
            </div>
          )
        }
      </div>
    </section >
  )
}

export default AddCompany