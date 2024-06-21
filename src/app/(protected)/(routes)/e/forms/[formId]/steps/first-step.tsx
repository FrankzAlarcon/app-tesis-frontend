"use client"

import SelectPopover from '@/components/select-popover'
import FormInput from '../../_components/form-input'
import { Step } from './container-form'
import { Label } from '@/components/ui/label'
import { useValuesValidation } from '@/hooks/use-values-validation'
import { LocalStorageKeys } from '@/enums/local-storage-keys'
import { businessDataSchema } from '@/schemas/student-form.schema'
import { tipoInstitucionReceptora } from '@/constants/tipo-institucion-receptora'
import { tipoPractica } from '@/constants/tipo-practica'
import { campoAmplio } from '@/constants/campo-amplio'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronsRight } from 'lucide-react'
import { useEffect } from 'react'
import FormError from '@/components/form-utilities/form-error'

interface FirstStepFormProps {
  setStep: (step: Step) => void
}

const initialState = {
  razonSocial: '',
  ciudad: '',
  direccion: '',
  telefono: '',
  celular: '',
  tipoInstitucion: '',
  responsable: '',
  cedula: '',
  nombres: '',
  creditos: '',
  tipoPractica: '',
  campoAmplio: '',
  campoEspecifico: '',
  tutorEpn: '',
  relacionConConvenio: {
    value: false,
    codigo: '',
    titulo: ''
  },
  relacionConInvestigacion: {
    value: false,
    codigo: '',
    titulo: ''
  },
  relacionConVinculacion: {
    value: false,
    codigo: '',
    titulo: ''
  },
}

const FirstStepForm = ({
  setStep
}: FirstStepFormProps) => {
  const { values, handleChange, validate, fieldErrors } = useValuesValidation(initialState, businessDataSchema, LocalStorageKeys.STEP_1)
  const handleNextStep = () => {
    const isValid = validate()
    if (!isValid) return
    setStep(2)
  }

  return (
    <div className='space-y-4'>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>1. Datos de la Empresa o Institución</p>
        </div>
        <div className='px-2 py-4 space-y-4 md:space-y-6 md:px-4'>
          <div className='space-y-2'>
            <FormInput
              id='razon-social'
              name='Razon Social'
              type='text'
              value={values.razonSocial}
              setValue={(value) => handleChange('razonSocial', value)}
              placeholder='Nombre de la empresa o institución'
              
            />
            {fieldErrors?.razonSocial && <FormError error={fieldErrors.razonSocial[0]} />}
          </div>
          <div className='flex flex-col gap-4 md:gap-6 md:flex-row'>
            <div className='w-full space-y-2'>
              <FormInput
                id='ciudad'
                name='Ciudad'
                type='text'
                className='w-full'
                value={values.ciudad}
                setValue={(value) => handleChange('ciudad', value)}
                placeholder='Ciudad de la empresa o institución'
              />
              {fieldErrors?.ciudad && <FormError error={fieldErrors.ciudad[0]} />}
            </div>
            <div className='w-full space-y-2'>
              <FormInput
                id='direccion'
                name='Dirección'
                type='text'
                className='w-full'
                value={values.direccion}
                setValue={(value) => handleChange('direccion', value)}
                placeholder='Dirección de la empresa o institución'
              />
              {fieldErrors?.direccion && <FormError error={fieldErrors.direccion[0]} />}
            </div>
          </div>
          <div className='flex flex-col gap-4 md:gap-6 md:flex-row'>
            <div className='space-y-2 w-full'>
              <FormInput
                id='telefono'
                name='Telefono'
                type='text'
                className='w-full'
                value={values.telefono}
                setValue={(value) => handleChange('telefono', value)}
                placeholder='Teléfono de la empresa o institución'
              />
              {fieldErrors?.telefono && <FormError error={fieldErrors.telefono[0]} />}
            </div>
            <div className='space-y-2 w-full'>
              <FormInput
                id='celular'
                name='Celular'
                type='text'
                className='w-full'
                value={values.celular}
                setValue={(value) => handleChange('celular', value)}
                placeholder='Celular de la empresa o institución'
              />
              {fieldErrors?.celular && <FormError error={fieldErrors.celular[0]} />}
            </div>
          </div>
          <div className='flex flex-col gap-4 md:gap-6 md:flex-row'>
            <div className='md:w-1/2 lg:w-1/3 w-full space-y-2'>
              <div className='relative w-full'>
                <Label
                  htmlFor='tipo-institucion'
                  className='absolute -top-2.5 left-3 text-sm font-bold bg-white px-1'
                >
                  Tipo de Institución Receptora
                </Label>
                <SelectPopover
                  label='Selecciona una...'
                  options={tipoInstitucionReceptora}
                  value={values.tipoInstitucion}
                  className='w-full border border-gray-200 text-xs'
                  setValue={(value) => handleChange('tipoInstitucion', value)}
                  emptyLabel='No existe el tipo de institución receptora'
                />
              </div>
              {fieldErrors?.tipoInstitucion && <FormError error={fieldErrors.tipoInstitucion[0]} />}
            </div>
            <div className='w-full md:w-1/2 lg:w-2/3 space-y-2'>
              <FormInput
                id='responsable'
                name='Responsable de la Institución Receptora'
                type='text'
                className='w-full'
                value={values.responsable}
                setValue={(value) => handleChange('responsable', value)}
                placeholder='Responsable de la Institución Receptora'
              />
              {fieldErrors?.responsable && <FormError error={fieldErrors.responsable[0]} />}
            </div>
          </div>
        </div>
      </div>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>2. Datos del Practicante</p>
        </div>
        <div className='px-2 py-4 flex flex-col gap-6 md:flex-row md:px-4'>
          <div className='w-full md:w-1/2 lg:w-1/4 space-y-2'>
            <FormInput
              id='cedula'
              name='Cedula de Identidad'
              type='text'
              placeholder='Ej. 1717171717'
              value={values.cedula}
              setValue={(value) => handleChange('cedula', value)}
              className='w-full'
            />
            {fieldErrors?.cedula && <FormError error={fieldErrors.cedula[0]} />}
          </div>
          <div className='w-full md:w-1/2 lg:w-2/4 space-y-2'>
            <FormInput
              id='nombres'
              name='Nombres y Apellidos'
              type='text'
              className='w-full'
              value={values.nombres}
              setValue={(value) => handleChange('nombres', value)}
              placeholder='Ej. Jhon Doe'
            />
            {fieldErrors?.nombres && <FormError error={fieldErrors.nombres[0]} />}
          </div>
          <div className='w-full md:w-1/2 lg:w-1/4 space-y-2'>
            <FormInput
              id='creditos'
              name='Créditos aprobados'
              type='text'
              className='w-full'
              value={values.creditos}
              setValue={(value) => handleChange('creditos', value)}
              placeholder='Ej. 105'
            />
            {fieldErrors?.creditos && <FormError error={fieldErrors.creditos[0]} />}
          </div>
        </div>
      </div>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>3. Responsabilidad de la información y consentimiento de tratamiento de datos</p>
        </div>
        <div className='px-2 py-4 flex flex-col gap-6 md:flex-row md:px-4'>
          <p>Yo, <span className='font-bold'>{values.nombres}</span>, con documento de identidad No. 1726354796 declaro bajo juramento 
          que la información de este formulario, así como la documentación adjunta al presente es veraz, 
          legítima y auténtica.Autorizo a la Escuela Politécnica Nacional para que pueda hacer uso de la 
          información de este formulario, así como de la documentación adjunta para el análisis dela presente 
          solicitud. Así también, autorizo a la Escuela Politécnica Nacional valide y verifique documentalmente 
          en cualquier momento la información ydocumentación proporcionada por mi persona.Tengo conocimiento que 
          la Escuela Politécnica Nacional se reserva el derecho de iniciar las acciones administrativas a las que 
          hubiere lugar para comprobar laveracidad, legitimidad y autenticidad de la información y documentación 
          presentada, en caso de identificar lo contrario, se procederá a archivar el trámite sinperjuicio del 
          inicio de los procesos o la aplicación de las sanciones que se puedan ejecutar en el marco del Código 
          Orgánico Integral Penal (Art. 328, Art. 328.1), dela Ley Orgánica para La Optimización y Eficiencia de 
          Trámites Administrativos (Art. 3 y Art. 10), de la Ley Orgánica de Educación Superior (Art. 207), así como 
          delReglamento de Disciplina y Sanciones de la Institución.</p>
        </div>
      </div>
      <div className='border'>
        <div className='border-b py-1 px-2 md:px-4'>
          <p className='font-bold text-sm'>4. Información sobre las Prácticas laborales o Servicio a la comunidad</p>
        </div>
        <div className='px-2 py-4 flex flex-col gap-6 md:px-4'>
          <div className='flex flex-col md:flex-row gap-6 w-full'>
            <div className='md:w-1/2 w-full space-y-2'>
              <div className='relative w-full'>
                <Label
                  htmlFor='tipo-institucion'
                  className='absolute -top-2.5 left-3 text-sm font-bold bg-white px-1'
                >
                  Tipo de Práctica
                </Label>
                <SelectPopover
                  label='Selecciona una...'
                  options={tipoPractica}
                  value={values.tipoPractica}
                  className='w-full border border-gray-200 text-xs'
                  setValue={(value) => handleChange('tipoPractica', value)}
                />
              </div>
              {fieldErrors?.tipoPractica && <FormError error={fieldErrors.tipoPractica[0]} />}
            </div>
            <div className='md:w-1/2 w-full space-y-2'>
              <div className='relative w-full'>
                <Label
                  htmlFor='tipo-institucion'
                  className='absolute -top-2.5 left-3 text-sm font-bold bg-white px-1'
                >
                  Campo amplio
                </Label>
                <SelectPopover
                  label='Selecciona una...'
                  options={campoAmplio}
                  value={values.campoAmplio}
                  className='w-full border border-gray-200 text-xs'
                  setValue={(value) => handleChange('campoAmplio', value)}
                  classNamePopover='w-96'
                />
              </div>
              {fieldErrors?.campoAmplio && <FormError error={fieldErrors.campoAmplio[0]} />}
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-6 w-full'>
            <div className='space-y-2 md:w-1/2 w-full'>
              <div className='relative w-full'>
                <Label
                  htmlFor='tipo-institucion'
                  className='absolute -top-2.5 left-3 text-sm font-bold bg-white px-1'
                >
                  Campo específico
                </Label>
                <SelectPopover
                  label='Selecciona una...'
                  options={campoAmplio.find(campo => campo.id === values.campoAmplio)?.campoEspecifico || []}
                  value={values.campoEspecifico}
                  className='w-full border border-gray-200 text-xs'
                  setValue={(value) => handleChange('campoEspecifico', value)}
                  emptyLabel='Selecciona un campo amplio primero'
                  classNamePopover='w-96'
                />
              </div>
              {fieldErrors?.campoEspecifico && <FormError error={fieldErrors.campoEspecifico[0]} />}
            </div>
            <div className='w-full md:w-1/2 space-y-2'>
              <FormInput
                id='tutorEpn'
                name='Tutor Académico de la Práctica (EPN)'
                type='text'
                className='w-full'
                value={values.tutorEpn}
                setValue={(value) => handleChange('tutorEpn', value)}
                placeholder='Ej. Jhon Doe'
              />
              {fieldErrors?.tutorEpn && <FormError error={fieldErrors.tutorEpn[0]} />}
            </div>
          </div>
          <div>
            <table className='w-full border border-collapse'>
              <thead>
                <tr className='font-bold text-sm w-full'>
                  <td className='w-4/12 border-collapse border'>Relación con</td>
                  <td className='w-1/12 border-collapse border text-center'>Si</td>
                  <td className='w-1/12 border-collapse border text-center'>No</td>
                  <td className='w-6/12 border-collapse border text-center'>Detalles</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='w-4/12 border-collapse border pl-2'>Convenio</td>
                  <td className='w-1/12 border-collapse border'>
                    <Input type='radio' value='si' id='si' name='convenio'
                      className='w-4 mx-auto block cursor-pointer'
                      defaultChecked={values.relacionConConvenio.value === true}
                      onChange={(evt) => handleChange('relacionConConvenio', { ...values.relacionConConvenio, value: evt.target.value === 'si' })}
                    />
                  </td>
                  <td className='w-1/12 border-collapse border'>
                    <Input type='radio' value='no' id='no' name='convenio' className='w-4 mx-auto block cursor-pointer'
                      defaultChecked={values.relacionConConvenio.value === false}
                      onChange={(evt) => handleChange('relacionConConvenio', { ...values.relacionConConvenio, value: evt.target.value === 'si' })}
                    />
                  </td>
                  <td className='w-6/12 border-collapse border-r'>
                    <div className='flex flex-col'>
                      <div className='flex gap-1 items-center h-6 border-b'>
                        <div className='w-20'>
                          <p className='text-sm font-bold border-r'>Código</p>
                        </div>
                        <Input type='text'
                          className='border-0 p-0 h-5 rounded-none'
                          value={values.relacionConConvenio?.codigo}
                          onChange={(evt) => handleChange('relacionConConvenio', { ...values.relacionConConvenio, codigo: evt.target.value })}
                        />
                      </div>
                      <div className='flex gap-1 items-center h-6'>
                        <div className='w-20'>
                          <p className='text-sm font-bold border-r'>Título</p>
                        </div>
                        <Input type='text'
                          className='border-0 p-0 h-5 rounded-none'
                          value={values.relacionConConvenio?.titulo}
                          onChange={(evt) => handleChange('relacionConConvenio', { ...values.relacionConConvenio, titulo: evt.target.value })}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='w-4/12 border-collapse border pl-2'>Proyecto de Investigación</td>
                  <td className='w-1/12 border-collapse border'>
                    <Input type='radio' value='si' id='si' name='investigacion' className='w-4 mx-auto block cursor-pointer'
                      defaultChecked={values.relacionConInvestigacion.value === true}
                      onChange={(evt) => handleChange('relacionConInvestigacion', { ...values.relacionConInvestigacion, value: evt.target.value === 'si' })}
                    />
                  </td>
                  <td className='w-1/12 border-collapse border'>
                    <Input type='radio' value='no' id='no' name='investigacion' className='w-4 mx-auto block cursor-pointer'
                      defaultChecked={values.relacionConInvestigacion.value === false}
                      onChange={(evt) => handleChange('relacionConInvestigacion', { ...values.relacionConInvestigacion, value: evt.target.value === 'si' })}
                    />
                  </td>
                  <td className='w-6/12 border-collapse border'>
                    <div className='flex flex-col'>
                      <div className='flex gap-1 items-center h-6 border-b'>
                        <div className='w-20'>
                          <p className='text-sm font-bold border-r'>Código</p>
                        </div>
                        <Input type='text'
                          className='border-0 p-0 h-5 rounded-none'
                          value={values.relacionConInvestigacion?.codigo}
                          onChange={(evt) => handleChange('relacionConInvestigacion', { ...values.relacionConInvestigacion, codigo: evt.target.value })}
                        />
                      </div>
                      <div className='flex gap-1 items-center h-6'>
                        <div className='w-20'>
                          <p className='text-sm font-bold border-r'>Título</p>
                        </div>
                        <Input type='text'
                          className='border-0 p-0 h-5 rounded-none'
                          value={values.relacionConInvestigacion?.titulo}
                          onChange={(evt) => handleChange('relacionConInvestigacion', { ...values.relacionConInvestigacion, titulo: evt.target.value })}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='w-4/12 border-collapse border pl-2'>Proyecto de Vinculacion</td>
                  <td className='w-1/12 border-collapse border'>
                    <Input type='radio' value='si' id='si' name='vinculacion' className='w-4 mx-auto block cursor-pointer'
                      defaultChecked={values.relacionConVinculacion.value === true}
                      onChange={(evt) => handleChange('relacionConVinculacion', { ...values.relacionConVinculacion, value: evt.target.value === 'si' })}
                    />
                  </td>
                  <td className='w-1/12 border-collapse border'>
                    <Input type='radio' value='no' id='no' name='vinculacion' className='w-4 mx-auto block cursor-pointer'
                      defaultChecked={values.relacionConVinculacion.value === false}
                      onChange={(evt) => handleChange('relacionConVinculacion', { ...values.relacionConVinculacion, value: evt.target.value === 'si' })}
                    />
                  </td>
                  <td className='w-6/12 border-collapse border'>
                    <div className='flex flex-col'>
                      <div className='flex gap-1 items-center h-6 border-b'>
                        <div className='w-20'>
                          <p className='text-sm font-bold border-r'>Código</p>
                        </div>
                        <Input type='text'
                          className='border-0 p-0 h-5 rounded-none'
                          value={values.relacionConVinculacion?.codigo}
                          onChange={(evt) => handleChange('relacionConVinculacion', { ...values.relacionConVinculacion, codigo: evt.target.value })}
                        />
                      </div>
                      <div className='flex gap-1 items-center h-6'>
                        <div className='w-20'>
                          <p className='text-sm font-bold border-r'>Título</p>
                        </div>
                        <Input type='text'
                          className='border-0 p-0 h-5 rounded-none'
                          value={values.relacionConVinculacion?.titulo}
                          onChange={(evt) => handleChange('relacionConVinculacion', { ...values.relacionConVinculacion, titulo: evt.target.value })}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='pt-2 flex justify-end'>
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

export default FirstStepForm