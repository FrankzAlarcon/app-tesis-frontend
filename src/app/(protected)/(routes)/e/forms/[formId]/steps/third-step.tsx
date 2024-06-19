"use client"

import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { Step } from './container-form'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useValuesValidation } from '@/hooks/use-values-validation'
import { LocalStorageKeys } from '@/enums/local-storage-keys'
import { step3Schema } from '@/schemas/student-form.schema'
import FormInput from '../../_components/form-input'
import PopoverCalendar from '@/components/popover-calendar'
import { generateId } from '@/lib/generate-id'
import { Input } from '@/components/ui/input'
import { ChangeEvent } from 'react'
import FormTextarea from '../../_components/form-textarea'

interface ThirdStepFormProps {
  setStep: (step: Step) => void
}

const initialState = {
  incluirDiasNoTrabajados: false,
  fechasDiasNoTrabajados: [{
    id: generateId(),
    date: new Date()
  }],
  observacionesAdicionales: '',
  horasTotales: '',
  pasantiasPagadas: {
    value: false,
    amount: ''
  },
  actividadesDesarrolladas: '',
  habilidadesAdquiridas: '',
  observacionesGenerales: ''
}

const ThirdStepForm = ({
  setStep
}: ThirdStepFormProps) => {
  const { values, handleChange } = useValuesValidation(initialState, step3Schema, LocalStorageKeys.STEP_3)

  const handleSelectDate = (id: string, date: Date | undefined) => {
    if (!date) return
    const dates = values.fechasDiasNoTrabajados.map((entry) => entry.id === id ? { ...entry, date } : entry)
    handleChange('fechasDiasNoTrabajados', dates)
  }

  const handleRemoveDate = (id: string) => {
    const dates = values.fechasDiasNoTrabajados.filter((entry) => entry.id !== id)
    handleChange('fechasDiasNoTrabajados', dates)
  }

  const handleAddDate = () => {
    const newDate = {
      id: generateId(),
      date: new Date()
    }
    handleChange('fechasDiasNoTrabajados', [...values.fechasDiasNoTrabajados, newDate])
  }

  return (
    <div className='space-y-4'>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>5. Información sobre las actividades realizadas por el estudiante</p>
          <p className='text-xs'>Esta información debe ser llenada con la ayuda o aprobación de un funcionario de la entidad receptora</p>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          <FormInput
            id='area-asignada'
            placeholder='Área asignada al estudiante'
            name='Área asignada'
            type='text'
          />
        </div>
        <div>
          <Label className='font-bold text-xs md:text-sm'>Horario asignado</Label>
          <div className='space-y-4'>
            <div>
              {/* TODO: Aqui va el cuadro del horario */}
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold text-xs md:text-sm'>Observaciones</Label>
              <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
                <div className='flex items-center gap-2'>
                  <Checkbox
                    id='dias-no-trabajados'
                    checked={values.incluirDiasNoTrabajados}
                    onCheckedChange={(e) => handleChange('incluirDiasNoTrabajados', e)}
                  />
                  <Label
                    htmlFor='dias-no-trabajados' className='text-xs'
                  >
                    Incluir días que no se trabajaron
                  </Label>
                </div>
                {
                  values.incluirDiasNoTrabajados && (
                    <div>
                      <Button
                        variant='outline'
                        className='w-full md:w-auto border-primary text-primary hover:bg-primary hover:text-white'
                        onClick={handleAddDate}
                      >Añadir día</Button>
                    </div>
                  )
                }
              </div>
              {
                values.incluirDiasNoTrabajados && (
                  values.fechasDiasNoTrabajados.map((entry) => (
                    <div key={entry.id} className='flex items-center gap-2 md:w-1/2 lg:w-1/3 xl:w-1/4'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => handleRemoveDate(entry.id)}
                      >
                        <X className='w-5 h-5' />
                      </Button>
                      <PopoverCalendar
                        value={entry.date}
                        onChange={(date) => handleSelectDate(entry.id, date)}
                      />
                    </div>
                  ))
                )
              }
              <div>
                <textarea
                  className='w-full p-2 border rounded-md placeholder:text-sm'
                  placeholder='Si existen, coloca observaciones adicionales'
                  value={values.observacionesAdicionales}
                  onChange={(e) => handleChange('observacionesAdicionales', e.target.value)}
                />
              </div>
              <div>
                <FormInput
                  id='horas-totales'
                  name='Horas totales'
                  type='text'
                  value={values.horasTotales}
                  disabled
                />
              </div>
            </div>
            <div className='flex flex-col gap-4 md:flex-row md:items-end'>
              <table className='w-full md:w-3/4'>
                <thead>
                  <tr>
                    <td></td>
                    <td className='border border-collapse text-center font-bold'>Si</td>
                    <td className='border border-collapse text-center font-bold'>No</td>
                  </tr>
                </thead>
                <tbody className='border border-collapse'>
                  <tr>
                    <td className='border border-collapse text-sm font-bold'>¿Pasantías pagadas?</td>
                    <td className='border border-collapse'>
                      <Input
                        type='radio'
                        name='pasantias-pagadas'
                        value='si'
                        id='si'
                        className='w-4 mx-auto block cursor-pointer'
                        onChange={() => handleChange('pasantiasPagadas', { ...values.pasantiasPagadas, value: true })}
                      />
                    </td>
                    <td className='border border-collapse'>
                      <Input
                        type='radio'
                        name='pasantias-pagadas'
                        value='no'
                        id='no'
                        className='w-4 mx-auto block cursor-pointer'
                        onChange={() => handleChange('pasantiasPagadas', { ...values.pasantiasPagadas, value: false })}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {
                values.pasantiasPagadas?.value && (
                  <div className='md:w-1/4'>
                    <FormInput
                      id='monto-pasantias'
                      name='Monto'
                      type='text'
                      value={values.pasantiasPagadas.amount}
                      setValue={(value) => handleChange('pasantiasPagadas', { ...values.pasantiasPagadas, amount: value})}
                    />
                  </div>
                )
              }
            </div>
            <div className='space-y-4'>
              <FormTextarea
                id='actividades-desarrolladas'
                name='Principales actividades desarrolladas'
                value={values.actividadesDesarrolladas}
                setValue={(value) => handleChange('actividadesDesarrolladas', value)}
              />
              <FormTextarea
                id='habilidades-adquiridas'
                name='Habilidades, destrezas o conocimiendos adquiridos durante la realización de las prácticas'
                value={values.habilidadesAdquiridas}
                setValue={(value) => handleChange('habilidadesAdquiridas', value)}
              />
              <div>
                {/* Tablita se seguimiento de practicas */}
              </div>
              <FormTextarea
                id='observaciones-generales'
                name='Observaciones'
                value={values.observacionesGenerales}
                setValue={(value) => handleChange('observacionesGenerales', value)}
              />
            </div>
            <div>
              {/* Tabla de evaluación cualitativa */}
            </div>
          </div>
        </div>
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