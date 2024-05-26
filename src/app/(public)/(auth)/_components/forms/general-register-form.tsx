"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import Loader from "@/components/loader"
import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { registerStudent } from "@/actions/students/register"
import { useToast } from "@/components/ui/use-toast"
import { FormError } from "../form-error"

function RegisterForm() {
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
      registerStudent(values)
        .then((res) => {
          if (res.error) {
            setError(res.error)
            return
          }
          toast({
            title: 'Registro exitoso',
            description: 'Usuario registrado correctamente',
            duration: 4000,
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
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre y Apellido" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={form.formState.isSubmitting}
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
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Contraseña" type="password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Confirmación de contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Confirmación de contraseña" type="password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button className='sm:min-w-24 mt-4' type='submit'>
          {form.formState.isSubmitting ? (
            <Loader className='text-white h-5 w-5' />
          ) : 'Registrarse'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm;

