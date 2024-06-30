import React from 'react'
import RegisterForm from './general-register-form'
import { registerCompany } from "@/actions/business/register"

function CompanyRegisterForm() {
  return (
    <div className='w-full'>
      <RegisterForm rol='company' actionLogin={registerCompany} />
    </div>
  )
}

export default CompanyRegisterForm