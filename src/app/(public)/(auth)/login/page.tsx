import React from 'react'
import LoginForm from '../_components/login-form'
import { auth } from '@/auth'

const LoginPage = () => {
  // auth().then(res => console.log("SC - LOGIN PAGE", res))
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage