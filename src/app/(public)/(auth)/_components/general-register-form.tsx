"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import email from "next-auth/providers/email"


const formSchema = z.object({
  name: z.string().regex(/^[^\s]+\s[^\s]+(?:\s[^\s]+)*$/, {
    message: "Por favor, ingrese su nombre y apellido.",
  }),
  email: z.string().email({
    message: "Por favor, ingrese un correo electrónico válido.",
  }),
  password: z.string().min(6, {
    message: "Su contraseña debe tener al menos 6 caracteres.",
  }),
  passwordConfirmation: z.string().min(6, {
    message: "Su contraseña debe tener al menos 6 caracteres.",
  }),

})

function RegisterForm() {

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })



  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault()

    form.reset({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    })

    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="name"
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
        <Button
          type="submit"
          className="hover:bg-blue-600"
        >Registrarse
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm;

