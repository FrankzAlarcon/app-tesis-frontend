"use client"

import { Button } from "../ui/button"
import Loader from "../loader"

interface FormSubmitProps {
  isSubmitting?: boolean
}

const FormSubmit = ({
  isSubmitting
}: FormSubmitProps) => {
  return (
    <Button disabled={isSubmitting} className='sm:min-w-24' type='submit'>
      {isSubmitting ? (
        <Loader className='text-white h-5 w-5' />
      ) : 'Guardar'}
    </Button>
  )
}

export default FormSubmit