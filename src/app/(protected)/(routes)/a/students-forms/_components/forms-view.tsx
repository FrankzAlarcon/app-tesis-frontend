'use client'

import StudentsTable from './students-table'
import FilterSearch from '../../_components/filter-search'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { getStudentForms } from '@/actions/admin/get-student-forms'
import { useDebounceValue } from 'usehooks-ts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Loader from '@/components/loader'
import { StudentForm } from './columns'
import { downloadForm } from '@/actions/students/download-form'
import { useToast } from '@/components/ui/use-toast'
import { StudentFormStatus } from '@/enums/student-forms.enum'

interface FormsViewProps {
  onShowForm: () => void
}


function FormsView({ onShowForm }: FormsViewProps) {
  const [debouncedValue, setDebouncedValue] = useDebounceValue<string>('', 800)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const { toast } = useToast()
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const { execute: executeDownloadForm } = useAction(downloadForm, {
    onError: () => {
      toast({
        title: 'Ha ocurrido un error al descargar el formulario',
        description: 'Recarga la página e intenta nuevamen',
        variant: 'destructive'
      })
    },
    onSuccess: (data) => {
      const pdfData = Uint8Array.from(data.file.data)
      const url = window.URL.createObjectURL(new Blob([pdfData.buffer], { type: "application/pdf" }))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', `${data.studentName};${data.formCode};${data.studentId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    }
  })
  const { data: studentForms, isLoading, execute } = useAction(getStudentForms, {
    onError: (err) => {
      console.log('error', err)
    }
  })

  useEffect(() => {
    if (debouncedValue.trim()) {
      execute({
        limit: 10,
        offset: 0,
        status: 'all'
      })
    }
    execute({
      limit: 10,
      offset: 0,
      filterField: 'name',
      filterValue: debouncedValue,
      status: 'all'
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const handleChangeOrder = (order: 'asc' | 'desc') => {
    setOrder(order)
    execute({
      limit: 10,
      offset: 0,
      orderField: 'createdAt',
      orderDirection: order,
      status: 'all'
    })
  }

  const handleNextPage = () => {
    setOffset(offset + limit)
    execute({
      limit,
      offset: offset + limit,
      status: 'all',
      orderField: 'createdAt',
      orderDirection: order
    })
  }

  const handlePreviousPage = () => {
    setOffset(offset - limit)
    execute({
      limit,
      offset: offset - limit,
      status: 'all',
      orderField: 'createdAt',
      orderDirection: order
    })
  }

  const handleDownload = useCallback(async (
    {id, status, formCode, studentId, studentName }: {
    id: string, status: StudentFormStatus, formCode: string
    studentName: string, studentId: string}
  ) => {
    await executeDownloadForm({
      studentFormId: id,
      status,
      formCode,
      studentName,
      studentId
    })
  }, [executeDownloadForm])

  const formsData: StudentForm[] = useMemo(() => {
    if (!studentForms || studentForms.data.length === 0) {
      return []
    }
    return studentForms.data.map((form) => ({
      id: form.id,
      formCode: form.formCode,
      formId: form.formId,
      status: form.status,
      studentName: form.studentName,
      studentId: form.studentId,
      onDownload: handleDownload
    }))
  }, [studentForms, handleDownload])
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
      <FilterSearch
        handleChangeOrder={handleChangeOrder}
        order={order}
        setValue={setDebouncedValue}
      />
      <div className='mt-4  min-h-[300px]'>
        {
          isLoading ? (
            <div className='flex justify-center '>
              <Loader />
            </div>
          ) : (
            <StudentsTable
              data={formsData}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          )
        }
      </div>
    </section>
  )
}

export default FormsView