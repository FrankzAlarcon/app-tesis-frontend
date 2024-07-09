"use client"

import ResetDataButton from '../../_components/reset-data-button'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, Download } from 'lucide-react'
import { Step } from './container-form'
import { Input } from '@/components/ui/input'
import { useValuesValidation } from '@/hooks/use-values-validation'
import { LocalStorageKeys } from '@/enums/local-storage-keys'
import { businessDataSchema, step2Schema, step3Schema, step4Schema } from '@/schemas/student-form.schema'
import { EPNSigners } from '@/constants/epn-signers'
import FormError from '@/components/form-utilities/form-error'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import Loader from '@/components/loader'
import { usePreview } from '@/hooks/use-preview'
import { useParams, useRouter } from 'next/navigation'

interface FourthStepFormProps {
  setStep: (step: Step) => void
  epnSigners: EPNSigners
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
  setStep,
  epnSigners
}: FourthStepFormProps) => {
  const { values, fieldErrors, handleChange, validate } = useValuesValidation(initialValues, step4Schema, LocalStorageKeys.STEP_4)
  const { setData, setFormId, setFormData } = usePreview()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    console.log('Use effect', epnSigners)
    handleChange('decano', epnSigners.decano)
    handleChange('comisionPracticas', epnSigners.representanteComision)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epnSigners])

  const handleDownload = async () => {
    setIsLoading(true)
    const isValid = validate()
    if (!isValid) {
      setIsLoading(false)
      return
    }
    const stepOne = JSON.parse(localStorage.getItem(LocalStorageKeys.STEP_1) || '{}') as any
    const stepTwo = JSON.parse(localStorage.getItem(LocalStorageKeys.STEP_2) || '{}') as any
    const stepThree = JSON.parse(localStorage.getItem(LocalStorageKeys.STEP_3) || '{}') as any

    const stepOneData = businessDataSchema.safeParse(stepOne)
    const stepTwoData = step2Schema.safeParse(stepTwo)
    const stepThreeData = step3Schema.safeParse(stepThree)
    if (!stepOneData.success || !stepTwoData.success || !stepThreeData.success) {
      toast({
        title: 'Error al validar los datos en los pasos anteriores',
        description: 'Por favor revisa los datos ingresados en los pasos anteriores',
        duration: 6000,
        variant: 'destructive'
      })
      return
    }
    const validatedStepOne = stepOneData.data
    const validatedStepTwo = stepTwoData.data
    const validatedStepThree = stepThreeData.data
    try {
      const formData = {
        career: validatedStepOne.career,
        modality: validatedStepOne.modality,
        businessData: {
          razonSocial: validatedStepOne.razonSocial,
          ruc: validatedStepOne.ruc,
          email: validatedStepOne.email,
          direccion: validatedStepOne.direccion,
          ciudad: validatedStepOne.ciudad,
          celular: validatedStepOne.celular,
          telefono: validatedStepOne.telefono,
          responsable: validatedStepOne.responsable,
          tipoInstitucion: validatedStepOne.tipoInstitucion,
        },
        studentData: {
          cedula: validatedStepOne.cedula,
          nombres: validatedStepOne.nombres,
          creditos: validatedStepOne.creditos,
        },
        internshipData: {
          tipoPractica: validatedStepOne.tipoPractica,
          campoAmplio: validatedStepOne.campoAmplio,
          campoEspecifico: validatedStepOne.campoEspecifico,
          tutorEpn: validatedStepOne.tutorEpn,
          relacionConConvenio: validatedStepOne.relacionConConvenio,
          relacionConInvestigacion: validatedStepOne.relacionConInvestigacion,
          relacionConVinculacion: validatedStepOne.relacionConVinculacion,
        },
        subjectsData: {
          subjects: validatedStepTwo.subjects,
          careerId: validatedStepTwo.careerId,
          additionalSubjects: validatedStepTwo.additionalSubjects,
        },
        scheduleData: {
          areaAsignada: validatedStepThree.areaAsignada,
          incluirDiasNoTrabajados: validatedStepThree.incluirDiasNoTrabajados,
          incluirHorasAlmuerzo: validatedStepThree.incluirHorasAlmuerzo,
          horarioSemanal: validatedStepThree.horarioSemanal,
          fechasDiasNoTrabajados: validatedStepThree.fechasDiasNoTrabajados,
          horasTotales: validatedStepThree.horasTotales,
          pasantiasPagadas: validatedStepThree.pasantiasPagadas,
          observacionesAdicionales: validatedStepThree.observacionesAdicionales,
        },
        activitiesData: {
          actividadesDesarrolladas: validatedStepThree.actividadesDesarrolladas,
          habilidadesAdquiridas: validatedStepThree.habilidadesAdquiridas,
          observacionesGenerales: validatedStepThree.observacionesGenerales,
          seguimientoTutorAcademico: validatedStepThree.seguimientoTutorAcademico,
          evaluacionCualitativa: validatedStepThree.evaluacionCualitativa,
        },
        signatureData: {
          tutor: values.tutor,
          entidadReceptora: values.entidadReceptora,
          comisionPracticas: values.comisionPracticas,
          decano: values.decano,
        }
      }
      const response = await axios.post('/api/forms', formData)
      setFormData(formData)
      setFormId(params.formId as string)
      setData(response.data.data)
      router.push('/e/forms/preview')
    } catch (error) {
      toast({
        title: 'Error al descargar el documento',
        description: 'Por favor, recarga la página e intenta nuevamente',
        duration: 6000,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
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
          {fieldErrors?.tutor && <FormError error={fieldErrors.tutor[0]} />}
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
          {fieldErrors?.entidadReceptora && <FormError error={fieldErrors.entidadReceptora[0]} />}
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
                value={epnSigners.representanteComision.name}
                // disabled
                onChange={(e) => handleChange('comisionPracticas', { ...values.comisionPracticas, name: e.target.value })}
                placeholder='Nombre'
                className='w-full'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Cédula:</p>
              <Input
                value={epnSigners.representanteComision.ci}
                // disabled
                onChange={(e) => handleChange('comisionPracticas', { ...values.comisionPracticas, ci: e.target.value })}
                placeholder='Cédula'
                className='w-full'
              />
            </div>
          </div>
          {fieldErrors?.comisionPracticas && <FormError error={fieldErrors.comisionPracticas[0]} />}
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
                value={epnSigners.decano.name}
                // disabled
                onChange={(e) => handleChange('decano', { ...values.decano, name: e.target.value })}
                placeholder='Nombre'
                className='w-full'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-sm w-16'>Cédula:</p>
              <Input
                value={epnSigners.decano.ci}
                // disabled
                onChange={(e) => handleChange('decano', { ...values.decano, ci: e.target.value })}
                placeholder='Cédula'
                className='w-full'
              />
            </div>
          </div>
          {fieldErrors?.decano && <FormError error={fieldErrors.decano[0]} />}
        </div>
      </div>
      <div className='pt-2 flex justify-between gap-6'>
        <Button
          onClick={() => setStep(3)}
          className='flex flex-col sm:flex-row gap-1 items-center w-full sm:w-auto'
        >
          <ChevronsLeft className='w-4 h-4' />
          <span>Anterior</span>
        </Button>
        <ResetDataButton setStep={setStep} />
        <Button
          disabled={isLoading}
          onClick={handleDownload}
          className='flex gap-1 items-center w-full sm:w-auto sm:min-w-[200px]'
        >
          {
            isLoading ? (
              <Loader className='text-white h-5 w-5' />
            ) : (
              <>
                <Download className='w-4 h-4' />
                <span>Descargar documento</span>
              </>
            )
          }
        </Button>
      </div>
    </div>
  )
}

export default FourthStepForm