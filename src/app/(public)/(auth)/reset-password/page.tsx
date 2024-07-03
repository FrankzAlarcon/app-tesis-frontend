import React from 'react'
import BackArrowButton from '../_components/back-arrow-button'
import ResetPasswordForm from '../_components/forms/reset-password-form'
import NotFoundPage from '@/app/not-found'

interface ResetPasswordPageProps {
  searchParams: {
    token: string
  }
}

const ResetPasswordPage = ({
  searchParams
}: ResetPasswordPageProps) => {
  const { token } = searchParams
  if (!token) {
    return <NotFoundPage complete={false} />
  }

  return (
    <section className='w-full h-full flex justify-center items-center relative'>
      <BackArrowButton returnUrl='/' />
      <div className='flex flex-col w-7/12  '>
        <h3 className='font-semibold text-2xl mb-2 text-center'>Cambiar contraseña</h3>
        <span className='text-xs text-gray-700 text-center pb-4'>Coloca una nueva contraseña. Hazla segura y guárdala.</span>
        <div className='flex justify-center items-center w-full'>
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </section>
  )
}

export default ResetPasswordPage