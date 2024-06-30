import React from 'react'
import BackArrowButton from '../_components/back-arrow-button'
import RecoveryPasswordForm from '../_components/forms/recovery-password-form'

const RecoveryPassword = () => {
  return (
    <section className='w-full h-full flex justify-center items-center relative'>
      <BackArrowButton returnUrl='/' />
      <div className='flex flex-col w-7/12  '>
        <h3 className='font-semibold text-2xl mb-2'>Recuperar contraseña</h3>
        <RecoveryPasswordForm />
      </div>
    </section>
  )
}

export default RecoveryPassword