import React from 'react'
import RegisterForm from './general-register-form'
import { registerStudent } from "@/actions/students/register"

function StudentRegisterForm() {
  return (
    <div className='w-full'>
      <RegisterForm actionLogin={registerStudent} />
    </div>
  )
}
export default StudentRegisterForm