"use client"

import { Button } from '@/components/ui/button'
import { ChevronsLeft, Save } from 'lucide-react'
import { Step } from './container-form'
import { Input } from '@/components/ui/input'
import { useValuesValidation } from '@/hooks/use-values-validation'
import { LocalStorageKeys } from '@/enums/local-storage-keys'
import { step4Schema } from '@/schemas/student-form.schema'

interface FourthStepFormProps {
  setStep: (step: Step) => void
}

const initialValues = {
  tutor: {
    name: '',
    ci: '',
  },
  entidadReceptora: {
    name: '',
    ci: '',
  },
  comisionPracticas: {
    name: '',
    ci: '',
  },
  decano: {
    name: '',
    ci: '',
  }
}

const FourthStepForm = ({
  setStep
}: FourthStepFormProps) => {
  const { values, handleChange, validate } = useValuesValidation(initialValues, step4Schema, LocalStorageKeys.STEP_4)

  const handleSave = () => {
    const isValid = validate()
    if (!isValid) return
  }

  return (
    <div className='space-y-2'>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>6. Firmas de responsable</p>
        </div>
      </div>
      <div className='md:grid md:grid-cols-2'>
        <div className='border border-collapse p-2'>
          <p className='font-bold text-sm text-center'>Tutor académico de prácticas EPN</p>
          <div>
            <div className='h-16'></div>
            <div className='flex flex-col items-center'>
              <p>f.________________________</p>
              <p className='text-sm font-bold'>Tutor</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Nombre:</p>
              <Input
                value={values.tutor.name}
                onChange={(e) => handleChange('tutor', { ...values.tutor, name: e.target.value })}
                placeholder='Nombre'
                className='w-full'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Cédula:</p>
              <Input
                value={values.tutor.ci}
                onChange={(e) => handleChange('tutor', { ...values.tutor, ci: e.target.value })}
                placeholder='Cédula'
                className='w-full'
              />
            </div>
          </div>
        </div>
        <div className='border border-collapse p-2'>
          <p className='font-bold text-sm text-center'>Entidad Receptora</p>
          <div>
            <div className='h-16'></div>
            <div className='flex flex-col items-center'>
              <p>f.________________________</p>
              <p className='text-sm font-bold'>Responsable de la Entidad Receptora</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Nombre:</p>
              <Input
                value={values.entidadReceptora.name}
                onChange={(e) => handleChange('entidadReceptora', { ...values.entidadReceptora, name: e.target.value })}
                placeholder='Nombre'
                className='w-full'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Cédula:</p>
              <Input
                value={values.entidadReceptora.ci}
                onChange={(e) => handleChange('entidadReceptora', { ...values.entidadReceptora, ci: e.target.value })}
                placeholder='Cédula'
                className='w-full'
              />
            </div>
          </div>
        </div>
        <div className='border border-collapse p-2'>
          <p className='font-bold text-sm text-center'>Comisión de prácticas preprofesionales</p>
          <div>
            <div className='h-16'></div>
            <div className='flex flex-col items-center'>
              <p>f.________________________</p>
              <p className='text-sm font-bold'>Presidente de la comisión de Prácticas Preporfesionales</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Nombre:</p>
              <Input
                value={values.comisionPracticas.name}
                onChange={(e) => handleChange('comisionPracticas', { ...values.comisionPracticas, name: e.target.value })}
                placeholder='Nombre'
                className='w-full'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Cédula:</p>
              <Input
                value={values.comisionPracticas.ci}
                onChange={(e) => handleChange('comisionPracticas', { ...values.comisionPracticas, ci: e.target.value })}
                placeholder='Cédula'
                className='w-full'
              />
            </div>
          </div>
        </div>
        <div className='border border-collapse p-2'>
          <p className='font-bold text-sm text-center'>Decano(a) de la Facultad / Director(a) de la ESFOT</p>
          <div>
            <div className='h-16'></div>
            <div className='flex flex-col items-center'>
              <p>f.________________________</p>
              <p className='text-sm font-bold'>Máxima autoridad</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Nombre:</p>
              <Input
                value={values.decano.name}
                onChange={(e) => handleChange('decano', { ...values.decano, name: e.target.value })}
                placeholder='Nombre'
                className='w-full'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Cédula:</p>
              <Input
                value={values.decano.ci}
                onChange={(e) => handleChange('decano', { ...values.decano, ci: e.target.value })}
                placeholder='Cédula'
                className='w-full'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='pt-2 flex justify-between gap-6'>
        <Button
          onClick={() => setStep(3)}
          className='flex gap-1 items-center w-full sm:w-auto'
        >
          <ChevronsLeft className='w-4 h-4' />
          <span>Anterior</span>
        </Button>
        <Button
          onClick={handleSave}
          className='flex gap-1 items-center w-full sm:w-auto'
        >
          <Save className='w-4 h-4' />
          <span>Guardar</span>
        </Button>
      </div>
    </div>
  )
}

export default FourthStepForm