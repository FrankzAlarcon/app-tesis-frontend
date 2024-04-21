import React from 'react'
import BackArrowButton from '../../_components/back-arrow-button'

function RegisterCompanyPage() {
  return (
    <section className=' w-full h-full flex justify-center items-center relative'>
      <BackArrowButton returnUrl='/register-type-selection' />
      <div className='flex flex-col w-7/12  '>
        <h3 className='font-semibold text-xl mb-2'>Crear una cuenta de Empresa</h3>
      </div>
    </section>
  )
}

export default RegisterCompanyPage