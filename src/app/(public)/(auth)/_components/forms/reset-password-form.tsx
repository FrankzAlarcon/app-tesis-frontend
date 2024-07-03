"use client"

import FormError from '@/components/form-utilities/form-error'
import Link from 'next/link'
import React, { useState } from 'react'
import { resetPassword } from '@/actions/shared/reset-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { resetPasswordSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import PasswordInput from '@/components/password-input'
import { useRouter } from 'next/navigation'

interface ResetPasswordFormProps {
  token: string
}

const ResetPasswordForm = ({
  token
}: ResetPasswordFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const { execute, isLoading } = useAction(resetPassword, {
    onSuccess: () => {
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña ha sido actualizada',
        duration: 6000,
        variant: 'default'
      })
      router.push('/login')
    }
  })
  const form = useForm<z.infer<typeof resetPasswordSchema >>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: ''
    }
  })
  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    if (data.password !== data.passwordConfirmation) {
      toast({
        title: 'Las contraseñas no coinciden',
        description: 'Por favor verifica que las contraseñas sean iguales',
        duration: 6000,
        variant: 'destructive'
      })
      setError('Las contraseñas no coinciden')
      return
    }
    setError(null)
    await execute({ password: data.password, token })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Contraseña" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Vuelve a escribir tu contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Contraseña" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        { error && <FormError error={error} />}
        <Button
          type="submit"
          className={`hover:bg-blue-600 ${isLoading ? "bg-blue-700/80 hover:bg-blue-700/80 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div>
              <div className="loader"></div>
            </div>
          ) : (
            "Guardar cambios"
          )}
        </Button>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm hover:underline">
            <Link href="/login">Volver al inicio de sesión</Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default ResetPasswordForm