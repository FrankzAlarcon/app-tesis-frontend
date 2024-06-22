"use client"

import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { Step } from './container-form'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useValuesValidation } from '@/hooks/use-values-validation'
import { LocalStorageKeys } from '@/enums/local-storage-keys'
import { step3Schema } from '@/schemas/student-form.schema'
import { generateId } from '@/lib/generate-id'
import { Input } from '@/components/ui/input'
import FormInput from '../../_components/form-input'
import PopoverCalendar from '@/components/popover-calendar'
import FormTextarea from '../../_components/form-textarea'
import Schedule from '../../_components/schedule'
import CualitativeEvaluation from '../../_components/cualitative-evaluation'
import FormError from '@/components/form-utilities/form-error'
import { useEffect } from 'react'
import { calculateHoursWithDays } from '@/lib/date-fns/calculate-days'
import { calculateSemanalWorkHours } from '@/lib/date-fns/calculate-hours'

interface ThirdStepFormProps {
  setStep: (step: Step) => void
}

const initialState = {
  areaAsignada: '',
  incluirDiasNoTrabajados: false,
  horarioSemanal: {
    total: '0',
    inicio: new Date().toISOString(),
    fin: new Date().toISOString(),
    horaAlmuerzo: {
      inicio: '',
      fin: ''
    },
    lunes: {
      inicio: '',
      fin: ''
    },
    martes: {
      inicio: '',
      fin: ''
    },
    miercoles: {
      inicio: '',
      fin: ''
    },
    jueves: {
      inicio: '',
      fin: ''
    },
    viernes: {
      inicio: '',
      fin: ''
    },
    sabado: {
      inicio: '',
      fin: ''
    },
    domingo: {
      inicio: '',
      fin: ''
    }
  },
  incluirHorasAlmuerzo: false,
  fechasDiasNoTrabajados: [{
    id: generateId(),
    date: new Date('2021-09-01T00:00:00.000Z')
  }],
  observacionesAdicionales: '',
  horasTotales: '0',
  pasantiasPagadas: {
    value: false,
    amount: ''
  },
  actividadesDesarrolladas: '',
  habilidadesAdquiridas: '',
  observacionesGenerales: '',
  seguimientoTutorAcademico: 'no',
  evaluacionCualitativa: {
    asistencia: '',
    desempeno: '',
    motivacion: '',
    conocimientos: ''
  }
}

const ThirdStepForm = ({
  setStep
}: ThirdStepFormProps) => {
  const { values, handleChange, validate, fieldErrors, handleSetValues } = useValuesValidation(initialState, step3Schema, LocalStorageKeys.STEP_3)

  useEffect(() => {
    console.log(fieldErrors)
  }, [fieldErrors])

  const handleSelectDate = (id: string, date: Date | undefined) => {
    if (!date) return
    const dates = values.fechasDiasNoTrabajados.map((entry) => entry.id === id ? { ...entry, date } : entry)
    const updatedValues = {
      ...values,
      fechasDiasNoTrabajados: dates
    }
    const totalHours = calculateHoursWithDays({
      start: updatedValues.horarioSemanal.inicio,
      end: updatedValues.horarioSemanal.fin,
      values: updatedValues.horarioSemanal,
      fechasNoTrabajadas: updatedValues.fechasDiasNoTrabajados,
      incluirDiasNoTrabajados: updatedValues.incluirDiasNoTrabajados,
      incluirHorasAlmuerzo: updatedValues.incluirHorasAlmuerzo
    }) 
    handleSetValues && handleSetValues({ ...updatedValues, horasTotales: String(totalHours) })
  }

  const handleEnableNoWorkDays = (e: any) => {
    const updatedValues = {
      ...values,
      incluirDiasNoTrabajados: e
    }
    const totalHours = calculateHoursWithDays({
      start: updatedValues.horarioSemanal.inicio,
      end: updatedValues.horarioSemanal.fin,
      values: updatedValues.horarioSemanal,
      fechasNoTrabajadas: updatedValues.fechasDiasNoTrabajados,
      incluirDiasNoTrabajados: e,
      incluirHorasAlmuerzo: updatedValues.incluirHorasAlmuerzo
    })
    handleSetValues && handleSetValues({ ...updatedValues, horasTotales: String(totalHours) })
  }

  const handleEnableLunchHours = (e: any) => {
    const updatedValues = {
      ...values,
      incluirHorasAlmuerzo: e
    }
    const totalHoursPerWeek = calculateSemanalWorkHours(updatedValues.horarioSemanal, e)
    const totalHours = calculateHoursWithDays({
      start: updatedValues.horarioSemanal.inicio,
      end: updatedValues.horarioSemanal.fin,
      values: updatedValues.horarioSemanal,
      fechasNoTrabajadas: updatedValues.fechasDiasNoTrabajados,
      incluirDiasNoTrabajados: updatedValues.incluirDiasNoTrabajados,
      incluirHorasAlmuerzo: e
    })
    handleSetValues && handleSetValues({
      ...updatedValues,
      horarioSemanal: {
        ...updatedValues.horarioSemanal,
        total: String(totalHoursPerWeek)
      },
      horasTotales: String(totalHours)
    })
  }

  const handleRemoveDate = (id: string) => {
    const dates = values.fechasDiasNoTrabajados.filter((entry) => entry.id !== id)
    const updatedValues = {
      ...values,
      fechasDiasNoTrabajados: dates
    }
    const totalHours = calculateHoursWithDays({
      start: updatedValues.horarioSemanal.inicio,
      end: updatedValues.horarioSemanal.fin,
      values: updatedValues.horarioSemanal,
      fechasNoTrabajadas:updatedValues.fechasDiasNoTrabajados,
      incluirDiasNoTrabajados: updatedValues.incluirDiasNoTrabajados,
      incluirHorasAlmuerzo: updatedValues.incluirHorasAlmuerzo
    })
    handleSetValues && handleSetValues({ ...updatedValues, horasTotales: String(totalHours) })
  }

  const handleAddDate = () => {
    const newDate = {
      id: generateId(),
      date: new Date('2021-09-01T00:00:00.000Z')
    }
    handleChange('fechasDiasNoTrabajados', [...values.fechasDiasNoTrabajados, newDate])
  }

  const handleCalculateSemanalWorkHours = (newValue: any) => {
    // calculate hours
    const totalHoursPerWeek = calculateSemanalWorkHours(newValue, values.incluirHorasAlmuerzo)
    const totalHour = calculateHoursWithDays({
      start: newValue.inicio,
      end: newValue.fin,
      values: newValue,
      fechasNoTrabajadas: values.fechasDiasNoTrabajados,
      incluirDiasNoTrabajados: values.incluirDiasNoTrabajados,
      incluirHorasAlmuerzo: values.incluirHorasAlmuerzo
    })
    const updatedValues = {
      ...values,
      horarioSemanal: {
        ...newValue,
        total: String(totalHoursPerWeek)
      },
      horasTotales: String(totalHour)
    }
    handleSetValues && handleSetValues(updatedValues)
  }

  const handleNextStep = () => {
    const isValid = validate()
    if (!isValid) return
    setStep(4)
  }

  const handleBackStep = () => {
    setStep(2)
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
        <div className='space-y-2'>
          <FormInput
            id='area-asignada'
            placeholder='Área asignada al estudiante'
            name='Área asignada'
            type='text'
            value={values.areaAsignada}
            setValue={(value) => handleChange('areaAsignada', value)}
          />
          {fieldErrors?.areaAsignada && <FormError error={fieldErrors.areaAsignada[0]} />}
        </div>
        <div>
          <div className='space-y-4'>
            <Label className='font-bold text-xs md:text-sm'>Horario semanal</Label>
            <div className='space-y-4'>
              <div className='flex flex-col gap-2 md:flex-row w-full md:items-center'>
                <div><p className='font-bold text-sm'>Inicio</p></div>
                <div className='w-full'>
                  <PopoverCalendar
                    value={new Date(values.horarioSemanal?.inicio as string)}
                    onChange={(date) => handleCalculateSemanalWorkHours({ ...values.horarioSemanal, inicio: date })}
                  />
                </div>
                <div><p className='font-bold text-sm'>Terminación</p></div>
                <div className='w-full'>
                  <PopoverCalendar
                    value={new Date(values.horarioSemanal?.fin as string)}
                    onChange={(date) => handleCalculateSemanalWorkHours({ ...values.horarioSemanal, fin: date })}
                  />
                </div>
              </div>
              <div className='overflow-y-hidden'>
                <Schedule values={values} handleChange={handleChange} handleSetValues={handleSetValues}/>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Checkbox
                    id='incluir-hora-almuerzo'
                    checked={values.incluirHorasAlmuerzo}
                    onCheckedChange={(e) => handleEnableLunchHours(e)}
                  />
                  <Label
                    htmlFor='dias-no-trabajados' className='text-xs'
                  >
                    Incluir hora de almuerzo
                  </Label>
                </div>
              {
                values.incluirHorasAlmuerzo && (
                    <div className='flex gap-2 md:w-3/4 lg:w-1/2'>
                      <div className='flex gap-2 items-center w-full'>
                        <div><p className='font-bold text-sm'>Inicio</p></div>
                        <div className='w-full'>
                          <Input
                            id='hora-almuerzo-inicio'
                            type='time'
                            className='block text-center'
                            value={values.horarioSemanal?.horaAlmuerzo?.inicio}
                            onChange={(e) => handleCalculateSemanalWorkHours({ ...values.horarioSemanal, horaAlmuerzo: { ...values.horarioSemanal.horaAlmuerzo, inicio: e.target.value } })}
                          />
                        </div>
                        <div><p className='font-bold text-sm'>Fin</p></div>
                        <div className='w-full'>
                          <Input
                            id='hora-almuerzo-fin'
                            type='time'
                            className='block text-center'
                            value={values.horarioSemanal?.horaAlmuerzo?.fin}
                            onChange={(e) => handleCalculateSemanalWorkHours({ ...values.horarioSemanal, horaAlmuerzo: { ...values.horarioSemanal.horaAlmuerzo, fin: e.target.value } })}
                          />
                        </div>
                      </div>
                    </div>
                )
              }
                <div className='pt-4'>
                  <FormInput
                    id='horas-semanales'
                    name='Horas semanales'
                    type='text'
                    value={values.horarioSemanal.total}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold text-xs md:text-sm'>Observaciones</Label>
              <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
                <div className='flex items-center gap-2'>
                  <Checkbox
                    id='dias-no-trabajados'
                    checked={values.incluirDiasNoTrabajados}
                    onCheckedChange={(e) => handleEnableNoWorkDays(e)}
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
                  values.fechasDiasNoTrabajados?.map((entry) => (
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
                        defaultChecked={values.pasantiasPagadas.value === true}
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
                        defaultChecked={values.pasantiasPagadas.value === false}
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
              <div className='flex w-full'>
                <div className='border border-collapse flex items-center px-2'>
                  <Label className='font-bold text-xs md:text-sm'>
                  ¿El tutor académico de prácticas preprofesionales de la EPN realizó el seguimiento de la práctica preprofesional?
                  </Label>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td className='border border-collapse px-2'>Si</td>
                      <td className='border border-collapse px-2'>
                        <Input
                          type='radio'
                          name='no'
                          value='si'
                          id='si'
                          className='w-4 mx-auto block cursor-pointer'
                          defaultChecked={values.seguimientoTutorAcademico === 'si'}
                          onChange={(e) => handleChange('seguimientoTutorAcademico', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='border border-collapse px-2'>No</td>
                      <td className='border border-collapse px-2'>
                        <Input
                          type='radio'
                          name='no'
                          value='no'
                          id='no'
                          className='w-4 mx-auto block cursor-pointer'
                          defaultChecked={values.seguimientoTutorAcademico === 'no'}
                          onChange={(e) => handleChange('seguimientoTutorAcademico', e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <FormTextarea
                id='observaciones-generales'
                name='Observaciones'
                value={values.observacionesGenerales}
                setValue={(value) => handleChange('observacionesGenerales', value)}
              />
            </div>
            <div>
              <CualitativeEvaluation values={values} handleChange={handleChange} />
            </div>
          </div>
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

export default ThirdStepForm