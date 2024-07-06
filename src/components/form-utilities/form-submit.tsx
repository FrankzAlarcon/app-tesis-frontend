"use client"

import { Button } from "../ui/button"
import Loader from "../loader"

interface FormSubmitProps {
  isSubmitting?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const FormSubmit = ({
  isSubmitting,
  type = 'submit'
}: FormSubmitProps) => {
  return (
    <Button disabled={isSubmitting} className='sm:min-w-24' type={type}>
      {isSubmitting ? (
        <Loader className='text-white h-5 w-5' />
      ) : 'Guardar'}
    </Button>
  )
}

export default FormSubmit