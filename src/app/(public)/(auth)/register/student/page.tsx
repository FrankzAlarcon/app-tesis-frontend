import React from 'react'
import StudentRegisterForm from '../../_components/forms/student-register-form'
import BackArrowButton from '../../_components/back-arrow-button'

function RegisterStudentPage() {
  return (
    <section className=' w-full h-full flex justify-center items-center relative'>
      <BackArrowButton returnUrl='/register-type-selection' />
      <div className='flex flex-col w-7/12  '>
        <h3 className='font-semibold text-xl mb-2'>Crear una cuenta de Estudiante</h3>
        <StudentRegisterForm />
      </div>
    </section>
  )
}

export default RegisterStudentPage