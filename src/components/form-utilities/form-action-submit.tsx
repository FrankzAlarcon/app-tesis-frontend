"use client"

import { Button } from "../ui/button"
import Loader from "../loader"
import { useFormStatus } from "react-dom"

const FormActionSubmit = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} className='w-full sm:min-w-24 sm:w-32' type='submit'>
      {pending ? (
        <Loader className='text-white h-5 w-5' />
      ) : 'Guardar'}
    </Button>
  )
}

export default FormActionSubmit