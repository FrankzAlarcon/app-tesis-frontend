import React from 'react'
import BackArrowButton from '../_components/back-arrow-button'
import { Button } from '@/components/ui/button'
import NotFoundPage from '@/app/not-found'
import { confirmEmail } from '@/actions/shared/confirm-email'
import ConfirmEmail from '../_components/forms/confirm-email'

interface ConfirmEmailPageProps {
  searchParams: {
    token: string
  }
}

const ConfirmEmailPage = ({
  searchParams
}: ConfirmEmailPageProps) => {
  const { token } = searchParams
  if (!token) {
    return <NotFoundPage complete={false} />
  }

  return (
    <section className='w-full h-full flex justify-center items-center relative'>
      <BackArrowButton returnUrl='/' />
      <div className='flex flex-col w-7/12  '>
        <h3 className='font-semibold text-2xl mb-2 text-center'>Confirmar correo electrónico</h3>
        <span className='text-xs text-gray-700 text-center pb-4'>Haz click para confirmar tu correo electrónico</span>
        <div className='flex justify-center items-center'>
          <ConfirmEmail token={token} />
        </div>
      </div>
    </section>
  )
}

export default ConfirmEmailPage