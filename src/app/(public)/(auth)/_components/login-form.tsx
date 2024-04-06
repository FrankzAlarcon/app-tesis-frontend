"use client"

import { login } from '@/actions/login'
import { auth } from '@/auth'
import React, { useEffect, useTransition } from 'react'

// Create a better login form
const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    // auth().then(res => console.log("CC - LOGINFORM", res))
  }, [])
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const values: any = Object.fromEntries(new FormData(e.target))
    console.log(values)

    startTransition(() => {
      login(values)
        .then((res) => {
          console.log("RES: ", res)
        })
        .catch((err) => {
          console.log("Error: ", err)
        })
    })
  }
  return (
    <div className='bg-gray-300 p-2'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input placeholder='email' id='email' name='email' type="email" />
        </label>
        <label htmlFor="password">
          <input placeholder='password' id='password' name='password' type="password" />
        </label>
        <input type="submit" value="Iniciar sesion" />
      </form>
    </div>
  )
}

export default LoginForm