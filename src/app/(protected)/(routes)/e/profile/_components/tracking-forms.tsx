"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { StudentFormStatus } from '@/enums/student-forms.enum'
import { formatDateComplete } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { RegisteredForm } from '@/types/forms'
import { BookCheck, BookX, CircleArrowLeft, CircleArrowRight, Notebook, NotebookPen } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

interface TrackingFormsProps {
  trackedForms: RegisteredForm[]
}

const EmitedForm =({ date, status }: {date: string | null, status: string}) => {
  return (
    <div className='text-xs flex items-center gap-1'>
      <div>
        <NotebookPen className={cn('w-8 h-8', status === StudentFormStatus.EMITIDO && 'text-blue-700')} />
      </div>
      <div className='flex flex-col'>
        <span className={cn('font-bold text-sm',
          status === StudentFormStatus.EMITIDO && 'text-primary'
        
        )}>Formulario emitido</span>
        <span>Recolecta las firmas y subelo nuevamente</span>
        {date && <span>Fecha: {formatDateComplete(date)}</span>}
      </div>
    </div>
  )
}

const PendingForm = ({ date, status }: {date: string | null, status: string}) => {
  return (
    <div className='text-xs flex items-center gap-1 border-t pt-2'>
      <div>
        <Notebook className={cn('w-8 h-8', status === StudentFormStatus.PENDIENTE && 'text-blue-700')} />
      </div>
      <div className='flex flex-col'>
        <span className={cn('font-bold text-sm',
          status === StudentFormStatus.PENDIENTE && 'text-primary'
        )}>Formulario pendiente</span>
        <span>Se revisará el formulario y se completarán las firmas</span>
        {date && <span>Fecha: {formatDateComplete(date)}</span>}
      </div>
    </div>
  )
}

const RepprovalForm = ({ date, status }: {date: string | null, status: string}) => {
  return (
    <div className='text-xs flex items-center gap-1 border-t pt-2'>
      <div>
        <BookX className={cn('w-8 h-8', status === StudentFormStatus.RECHAZADO && 'text-red-500')} />
      </div>
      <div className='flex flex-col'>
        <span className={cn('font-bold text-sm',
          status === StudentFormStatus.RECHAZADO && 'text-red-500'
        )}>Formulario rechazado</span>
        <span>Realiza las correcciones necesarias</span>
        {date && <span>Fecha: {formatDateComplete(date)}</span>}
      </div>
    </div>
  )
}

const ApprovedForm = ({ date, status }: {date: string | null, status: string}) => {
  return (
    <div className='text-xs flex items-center gap-1 border-t pt-2'>
      <div>
        <BookCheck className={cn('w-8 h-8', status === StudentFormStatus.APROBADO && 'text-blue-700')} />
      </div>
      <div className='flex flex-col'>
        <span className={cn('font-bold text-sm',
          status === StudentFormStatus.APROBADO && 'text-primary'
        )}>Formulario aprobado.</span>
        <span>Pronto se registrarán tus horas en el saew.</span>
        {date && <span>Fecha: {formatDateComplete(date)}</span>}
      </div>
    </div>
  )
}

const TrackingForms = ({
  trackedForms
}: TrackingFormsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedForm = useMemo(() => {
    if (trackedForms.length === 0) return null
    return trackedForms[selectedIndex]
  }, [selectedIndex, trackedForms])

  const handleBackFormIndex = () => {
    const newIndex = selectedIndex - 1
    if (newIndex < 0) return
    setSelectedIndex(newIndex)
  }

  const handleNextFormIndex = () => {
    const newIndex = selectedIndex + 1
    if (newIndex > trackedForms.length - 1) return
    setSelectedIndex(newIndex)
  }

  const handleDownloadForm = () => {
    // TODO: download form
    // TODO: Upload form with first signatures
    console.log('descargar formulario seleccionado', selectedForm?.url)
  }
  return (
    <div>
      {
        trackedForms.length === 0 && (
          <div>
            <p className='text-sm py-4'>Aún no has iniciado el seguimiento de un formulario</p>
            <p className='text-sm'>¿Deseas completar el formulario para convalidar tus prácticas preprofesionales?</p>
            <Link href={`/e/forms/registration-preprofesional-practices`}
              className={buttonVariants({ variant: 'outline' , size: 'sm', className: 'mt-4 w-full' })}
            >
              Ir a formulario F_AA_119
            </Link>
          </div>
        )
      }
      {
        trackedForms.length > 0 && selectedForm && (
          <div className='flex flex-col gap-4 pt-4'>
            <div>
              {
                selectedForm.status === StudentFormStatus.EMITIDO && (
                  <EmitedForm date={selectedForm.startDate} status={selectedForm.status} />
                )
              }
              {
                selectedForm.status === StudentFormStatus.PENDIENTE && (
                  <div className='space-y-2'>
                    <EmitedForm date={selectedForm.startDate} status={selectedForm.status} />
                    <PendingForm date={selectedForm.pendingDate} status={selectedForm.status} />
                  </div>
                )
              }
              {
                selectedForm.status === StudentFormStatus.RECHAZADO && (
                  <>
                    <EmitedForm date={selectedForm.startDate} status={selectedForm.status} />
                    <PendingForm date={selectedForm.pendingDate} status={selectedForm.status} />
                    <RepprovalForm date={selectedForm.repprovalDate} status={selectedForm.status} />
                  </>
                )
              }
              {
                selectedForm.status === StudentFormStatus.APROBADO && (
                  <>
                    <EmitedForm date={selectedForm.startDate} status={selectedForm.status} />
                    <PendingForm date={selectedForm.pendingDate} status={selectedForm.status} />
                    <ApprovedForm date={selectedForm.approvalDate} status={selectedForm.status} />
                  </>
                )
              }
            </div>
            <div className='space-y-2'>
              {
                selectedForm.status === StudentFormStatus.EMITIDO && (
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full'
                    onClick={handleDownloadForm}
                  >
                    Subir formulario
                  </Button>
                )
              }
              <Button
                variant='outline'
                size='sm'
                className='w-full'
                onClick={handleDownloadForm}
              >
                Descargar formulario
              </Button>
            </div>
            <div className='flex justify-center gap-4'>
              <Button
                size='sm'
                onClick={handleBackFormIndex}
                disabled={selectedIndex === 0}
                variant='outline'
                className='rounded-full w-full'
              >
                <CircleArrowLeft className='w-7 h-7' />
              </Button>
              <Button
                size='sm'
                onClick={handleNextFormIndex}
                disabled={selectedIndex === trackedForms.length - 1}
                variant='outline'
                className='rounded-full w-full'
              >
                <CircleArrowRight className='w-7 h-7' />
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TrackingForms