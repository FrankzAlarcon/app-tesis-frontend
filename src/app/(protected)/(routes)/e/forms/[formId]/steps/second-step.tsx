"use client"

import { Button } from "@/components/ui/button"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { Step } from "./container-form"
import { useValuesValidation } from "@/hooks/use-values-validation"
import { LocalStorageKeys } from "@/enums/local-storage-keys"
import { step2Schema } from "@/schemas/student-form.schema"

interface SecondStepFormProps {
  setStep: (step: Step) => void
}

const initialValues = {

}

const SecondStepForm = ({
  setStep
}: SecondStepFormProps) => {
  const { values, handleChange } = useValuesValidation(initialValues, step2Schema, LocalStorageKeys.STEP_2)
  return (
    <div className='space-y-4'>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>Seleccione las asignaturas de la malla curricular y temáticas de mayor utilidad para el desarrollo de la práctica:</p>
        </div>
      </div>
      <div className='pt-2 flex justify-between gap-6'>
        <Button
          onClick={() => setStep(1)}
          className='flex gap-1 items-center w-full sm:w-auto'
        >
          <ChevronsLeft className='w-4 h-4' />
          <span>Anterior</span>
        </Button>
        <Button
          onClick={() => setStep(3)}
          className='flex gap-1 items-center w-full sm:w-auto'
        >
          <span>Siguiente</span>
          <ChevronsRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

export default SecondStepForm