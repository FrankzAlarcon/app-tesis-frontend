"use client"

import { Button } from "@/components/ui/button"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { Step } from "./container-form"
import { useValuesValidation } from "@/hooks/use-values-validation"
import { LocalStorageKeys } from "@/enums/local-storage-keys"
import { step2Schema } from "@/schemas/student-form.schema"
import { useAction } from "@/hooks/use-action"
import { getSubjectsByCareer } from "@/actions/students/get-subjetcs-by-career"
import { Career } from "@/types/careers"
import SelectPopover from "@/components/select-popover"
import { Label } from "@/components/ui/label"
import SubjectCard from "../../_components/subject-card"
import { Textarea } from "@/components/ui/textarea"
import Loader from "@/components/loader"
import { useEffect } from "react"

interface SecondStepFormProps {
  setStep: (step: Step) => void
  careers: Career[]
}

const initialValues = {
  careerId: '',
  subjects: [] as (string | undefined)[],
  additionalSubjects: ''
}

const SecondStepForm = ({
  setStep,
  careers
}: SecondStepFormProps) => {
  const { values, handleChange, validate, fieldErrors } = useValuesValidation(initialValues, step2Schema, LocalStorageKeys.STEP_2)
  const { data, isLoading, execute, resetValues: resetActionValues } = useAction(getSubjectsByCareer, {
    onError: () => {
      resetActionValues()
    },
  })

  useEffect(() => {
    if (!!values.careerId && !data) {
      execute({ careerId: values.careerId })
    }
  }, [values.careerId, data, execute])

  const handleNextStep = () => {
    const isValid = validate()
    if (!isValid) return
    setStep(3)
  }

  const handleBackStep = () => {
    setStep(1)
  }

  const handleSelectPopover = (value: string) => {
    handleChange('careerId', value)
    execute({ careerId: value })
  }
  const handleSelectSubject = (value: string) => {
    if (values.subjects.includes(value)) {
      const subjects = values.subjects.filter(subject => subject !== value)
      handleChange('subjects', subjects)
      return
    }
    const subjects = [...values.subjects, value]
    handleChange('subjects', subjects)
  }
  
  return (
    <div className='space-y-4'>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>Seleccione las asignaturas de la malla curricular y temáticas de mayor utilidad para el desarrollo de la práctica:</p>
        </div>
      </div>
      <div>
        <div>
          <div className='relative w-full'>
            <Label
              htmlFor='careerId'
              className='absolute -top-2.5 left-3 text-sm font-bold bg-white px-1'
            >
              Selecciona tu carrera
            </Label>
            <SelectPopover
              label='Selecciona una...'
              options={careers}
              value={values.careerId}
              className='w-full border border-gray-200 text-xs'
              setValue={(value) => handleSelectPopover(value)}
              classNamePopover='w-96'
            />
          </div>
        </div>
        <div className="pt-6 space-y-4 md:space-y-6">
          {data?.length === 0 && (
            <p className='text-sm text-red-500 text-center'>No hay asignaturas disponibles</p>
          )}
          {isLoading && (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          )}
          {data?.length && data.length > 0 && !isLoading && data?.map(semester => (
            <div key={semester[0].semester}
              className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
            >
              {
                semester.map(subject => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    selectedSubjects={values.subjects as string[]}
                    handleSelectSubject={handleSelectSubject}
                  />
                ))
              }
            </div>
          ))}
        </div>
        <div className="pt-6 space-y-2">
          <Label className="lg:text-base">Coloca alguna otra materia que utilizaste:</Label>
          <Textarea
            className=""
            value={values.additionalSubjects}
            onChange={(e) => handleChange('additionalSubjects', e.target.value)}
            placeholder="Coloca las materias separadas por coma (,). Ejemplo: Cloud Computing, Gestión de Procesos"
          />
        </div>
      </div>
      <div className='pt-2 flex justify-between gap-6'>
        <Button
          onClick={handleBackStep}
          className='flex gap-1 items-center w-full sm:w-auto'
        >
          <ChevronsLeft className='w-4 h-4' />
          <span>Anterior</span>
        </Button>
        <Button
          onClick={handleNextStep}
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