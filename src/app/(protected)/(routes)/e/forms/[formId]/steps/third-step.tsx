"use client"

import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Step } from './container-form'

interface ThirdStepFormProps {
  setStep: (step: Step) => void
}

const ThirdStepForm = ({
  setStep
}: ThirdStepFormProps) => {
  return (
    <div className='space-y-4'>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>5. Información sobre las actividades realizadas por el estudiante</p>
          <p className='text-xs'>Esta información debe ser llenada con la ayuda o aprobación de un funcionario de la entidad receptora</p>
        </div>
      </div>
      <div>

      </div>
      <div className='pt-2 flex justify-between gap-6'>
        <Button
          onClick={() => setStep(2)}
          className='flex gap-1 items-center w-full sm:w-auto'
        >
          <ChevronsLeft className='w-4 h-4' />
          <span>Anterior</span>
        </Button>
        <Button
          onClick={() => setStep(4)}
          className='flex gap-1 items-center w-full sm:w-auto'
        >
          <span>Siguiente</span>
          <ChevronsRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

export default ThirdStepForm