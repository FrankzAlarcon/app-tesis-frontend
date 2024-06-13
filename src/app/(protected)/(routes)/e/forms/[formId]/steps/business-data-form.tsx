"use client"

import FormInput from '../../_components/form-input'

const BusinessDataForm = () => {
  return (
    <div className='border'>
      <div className='border-b py-1 px-2 md:px-4'>
        <p className='font-bold text-sm'>1. Datos de la Empresa o Institución</p>
      </div>
      <div className='px-2 py-4 space-y-4 md:space-y-6 md:px-4'>
        <FormInput
          id='razon-social'
          name='Razon Social'
          type='text'
          placeholder='Nombre de la empresa o institución'
          
        />
        <div className='flex flex-col gap-4 md:gap-6 md:flex-row'>
          <FormInput
            id='ciudad'
            name='Ciudad'
            type='text'
            className='w-full'
            placeholder='Ciudad de la empresa o institución'
          />
          <FormInput
            id='direccion'
            name='Dirección'
            type='text'
            className='w-full'
            placeholder='Dirección de la empresa o institución'
          />
        </div>
        <div className='flex flex-col gap-4 md:gap-6 md:flex-row'>
          <FormInput
            id='telefono'
            name='Telefono'
            type='text'
            className='w-full'
            placeholder='Teléfono de la empresa o institución'
          />
          <FormInput
            id='celular'
            name='Celular'
            type='text'
            className='w-full'
            placeholder='Celular de la empresa o institución'
          />
        </div>
        <div className='flex flex-col gap-4 md:gap-6 md:flex-row'>
          {/* TODO: Hacer un select */}
          <FormInput
            id='tipo-institucion'
            name='Tipo de Institución Receptora'
            type='text'
            className='w-full md:w-1/3'
            placeholder='Tipo de Institución Receptora'
          />
          <FormInput
            id='responsable'
            name='Responsable de la Institución Receptora'
            type='text'
            className='w-full md:w-2/3'
            placeholder='Responsable de la Institución Receptora'
          />
        </div>
      </div>
    </div>
  )
}

export default BusinessDataForm