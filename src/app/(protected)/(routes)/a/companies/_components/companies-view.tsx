'use client'

import { useEffect, useMemo, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import FilterSearch from '../../_components/filter-search'
import CompaniesTable from './companies-table/companies-table'
import { Business } from '@/types/business'
import Link from 'next/link'
import { removeCovenant } from '@/actions/business/remove-convenant'
import { createConvenant } from '@/actions/business/create-convenant'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { getAllBusiness } from '@/actions/admin/get-business'
import Loader from '@/components/loader'
import { useDebounceValue } from 'usehooks-ts'



interface CompaniesViewProps {
  business: Business[]
}

function CompaniesView() {
  // const addCovenantButtonRef = useRef<HTMLButtonElement>(null);
  // const deleteCovenantButtonRef = useRef<HTMLButtonElement>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const { data: business, isLoading: isLoadingGetAll, execute: executeAllBusiness } = useAction(getAllBusiness, {
    onError: () => {
      toast({
        title: 'Error al obtener las empresas',
        duration: 4000,
        description: 'Ha ocurrido un error al intentar obtener las empresas. Por favor, inténtalo de nuevo.',
      })
    },
  })
  const [debouncedValue, setDebouncedValue] = useDebounceValue<string>('', 800)
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

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { toast } = useToast()
  const { execute: executeAddCovenant, resetValues: resetValuesCovenant } = useAction(createConvenant, {
    onError: () => {
      toast({
        title: 'Error al agregar la empresa',
        duration: 4000,
        description: 'Ha ocurrido un error al intentar agregar la empresa. Por favor, inténtalo de nuevo.',
      })
    },
    onSuccess: () => {
      resetValuesCovenant()
      toast({
        title: 'Empresa agregada',
        duration: 4000,
        description: 'La empresa ha sido agregada correctamente.',
      })
    }
  })

  const { execute: executeRemoveCovenant, resetValues, isLoading: isLoadingRemoveCovenant } = useAction(removeCovenant, {
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

  const handleAddCompany = (id: string) => {
    setSelectedCompany(id);
    setShowAlertDialog(true);
  }

  const handleDeleteCompany = (id: string) => {
    setSelectedCompany(id);
    setShowDeleteDialog(true);
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
    executeAddCovenant(data);
    setShowAlertDialog(false);
  }

  const handleDeleteCovenant = () => {
    executeRemoveCovenant({ convenantId: selectedCompany! })
    setShowDeleteDialog(false);
  }

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

  const handleNextPage = () => {
    setOffset(offset + limit)
    executeAllBusiness({
      limit: 10,
      offset: offset + limit,
      filterField: 'name',
      filterValue: debouncedValue,
      orderField: 'createdAt',
      orderDirection: order,
    })
  }

  const handlePreviousPage = () => {
    setOffset(offset - limit)
    executeAllBusiness({
      limit: 10,
      offset: offset - limit,
      filterField: 'name',
      filterValue: debouncedValue,
      orderField: 'createdAt',
      orderDirection: order,
    })
  }
  const companies = useMemo(() => {
    if (!business || business.data.length === 0) {
      return []
    }
    return business.data.map((company) => {
      return {
        id: company.id,
        name: company.name,
        code: company.code.split("-")[0],
        agreement: company.hasCovenant ? 'Laboral' : 'Sin convenio',
        onAdd: handleAddCompany,
        onRemove: handleDeleteCompany,
      }
    })
  }, [business])
  console.log({companies})
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
      {showAlertDialog && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-40'>
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
                  disabled={isLoadingRemoveCovenant}
                >
                  {isLoadingRemoveCovenant ? 'Agregando...' : 'Agregar'}
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
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-40'>
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
                  onClick={handleDeleteCovenant}
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

      <FilterSearch
        setValue={setDebouncedValue}
        order={order}
        handleChangeOrder={handleChangeOrder}
      />
      <div className='mt-4 min-h-[300px]'>
        {
          isLoadingGetAll ? (
            <div className='flex justify-center '>
              <Loader />
            </div>
          )
          : <CompaniesTable
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              data={companies}
            />
        }
        
      </div>
    </section >
  )
}

export default CompaniesView