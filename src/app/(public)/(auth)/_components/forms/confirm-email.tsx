"use client"

import { confirmEmail } from '@/actions/shared/confirm-email'
import FormError from '@/components/form-utilities/form-error'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { useRouter } from 'next/navigation'

interface ConfirmEmailProps {
  token: string
}

const ConfirmEmail = ({
  token
}: ConfirmEmailProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { execute, isLoading, error } = useAction(confirmEmail, {
    onError: () => {
      toast({
        title: 'Error al confirmar el correo',
        description: 'Vuelve a repetir el proceso para confirmar tu correo electrónico',
        duration: 6000,
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      toast({
        title: 'Correo confirmado',
        description: 'Tu correo ha sido confirmado',
        duration: 6000,
        variant: 'default'
      })
      router.push('/login')
    }
  })
  const handleConfirmEmail = async () => {
    await execute({ token })
  }
  return (
    <div className='w-full space-y-2'>
      <Button disabled={isLoading} onClick={handleConfirmEmail} className='bg-green-500 hover:bg-green-400 w-full'>
        {isLoading ? (
          <Loader className='text-white h-5 w-5' />
        ) : 'Verificar email'}
      </Button>
      { error && <FormError error="Ha ocurrido un error al confirmar el email" />}
    </div>
  )
}

export default ConfirmEmail