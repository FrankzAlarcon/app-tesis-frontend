import React from 'react'
import StudentRegisterForm from '../../_components/student-register-form'

function RegisterStudentPage() {
  return (
    <section className=' w-full h-full flex justify-center items-center'>
      <div className='flex flex-col w-7/12  '>
        <h3 className='font-semibold text-xl mb-2'>Crear una cuenta de Estudiante</h3>
        <StudentRegisterForm />
      </div>
    </section>
  )
}

export default RegisterStudentPage