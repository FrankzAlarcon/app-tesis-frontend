"use client"

import { login } from "@/actions/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { loginSchema } from "@/schemas/auth.schema"
import { FormError } from "../form-error"

function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  // Form definition
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // submit handler
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError('')
    console.log("click submit")
    startTransition(() => {
      console.log(values);
      login(values)
        .then((res) => {
          form.reset();
          setError(res?.error ?? '')
        })
        .catch((err) => {
          console.log("Error: ", err)
        })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="Correo electrónico" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Contraseña" type="password" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button type="submit" className="hover:bg-blue-600" disabled={isPending}>Iniciar sesión</Button>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm hover:underline">
            <Link href="/auth/password-recovery">¿Olvidaste tu contraseña?</Link>
          </p>
          <p
            className='text-center text-sm'>¿Ya tienes una cuenta?<span className='ml-1 text-primary font-semibold'>
              <Link href='/register-type-selection'>Regístrate</Link>
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
