"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/schemas/auth.schema"
import PaswordInput from "@/components/password-input"
import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { FormError } from "../form-error"
import FormSubmit from "@/components/form-utilities/form-submit"
import Link from "next/link"

interface RegisterFormProps {
  rol: string
  actionLogin: (values: z.infer<typeof registerSchema>) => Promise<any>
}

function RegisterForm({ actionLogin, rol }: RegisterFormProps) {
  // Form definition
  const [error, setError] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError('')
    if (values.password !== values.passwordConfirmation) {
      setError('Las contraseñas no coinciden')
      return
    }
    startTransition(() => {
      console.log(values)
      console.log(pathname)
      actionLogin(values)
        .then((res) => {
          if (res.error) {
            setError(res.error)
            return
          }
          toast({
            title: 'Se ha enviado un correo de confirmación a tu email',
            description: 'Tu cuenta se ha creado correctamente, verifica tu email para iniciar sesión',
            duration: 8000,
            variant: 'default'
          })
          router.push('/login')
          form.reset()
        })
        .catch((err) => {
          console.log("Error: ", err)
        })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="name"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Nombre</FormLabel>
              <FormControl>
                <Input placeholder={rol === 'student' ? 'Nombre y Apellido' : 'Nombre de la empresa'} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Contraseña</FormLabel>
              <FormControl>
                <PaswordInput placeholder="Contraseña" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Confirmación de contraseña</FormLabel>
              <FormControl>
                <PaswordInput placeholder="Confirmación de contraseña"  {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSubmit isSubmitting={isPending} />
        <div className="flex flex-col gap-2 items-center">
          <p
            className='text-center text-sm'>¿Ya tienes una cuenta?<span className='ml-1 text-primary font-semibold'>
              <Link href='/login'>Inicia sesión</Link>
            </span>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm;

