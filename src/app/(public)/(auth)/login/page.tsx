import React from 'react'
import LoginForm from '../_components/forms/login-form'
import BackArrowButton from '../_components/back-arrow-button'

const LoginPage = () => {
  // auth().then(res => console.log("SC - LOGIN PAGE", res))
  return (
    <section className='w-full h-full flex justify-center items-center relative'>
      <BackArrowButton returnUrl='/' />
      <div className='flex flex-col w-7/12  '>        
        <h3 className='font-semibold text-2xl mb-2'>Login</h3>
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginPage