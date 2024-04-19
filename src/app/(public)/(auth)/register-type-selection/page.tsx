import React from 'react'
import Link from 'next/link'
import ButtonSelection from '../_components/button-selection'

function RegisterTypeSelection() {
  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div className='flex flex-col gap-4'>
        <div>
          <h4 className='font-bold text-center text-3xl'>¡Bienvenido!</h4>
          <p className='text-center mt-1'>¿Cómo quieres registrarte?</p>
        </div>
        <div className='flex flex-col gap-4'>
          <ButtonSelection
            title='Soy un estudiante'
            description='Quiero exponer mis conocimientos y postularme a las ofertas de empresas para realizar mis prácticas.'
            link='/register/student'
          />
          <ButtonSelection
            title='Soy una empresa'
            description='Quiero ofertar prácticas y encontrar a los estudiantes con las mejores capacidades para el puesto que necesito.'
            link='/register/company'
          />
        </div>
        <p
          className='text-center'>¿Ya tienes una cuenta?<span className='ml-1 text-primary font-semibold'>
            <Link href='/login'>Iniciar sesión</Link>
          </span>
        </p>

      </div>
    </div>
  )
}

export default RegisterTypeSelection  