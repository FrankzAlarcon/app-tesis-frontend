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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingrese un correo electrónico válido.",
  }),
  password: z.string().min(1, {
    message: "Por favor, ingrese su contraseña.",
  }),
  remenberMe: z.boolean(),
});



function LoginForm() {

  const [isPending, startTransition] = useTransition()

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remenberMe: false,
    },
  });

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();

    startTransition(() => {
      console.log(values);
      login(values)
        .then((res) => {
          form.reset({
            email: "",
            password: "",
          });
          console.log("RES: ", res)
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
                <Input placeholder="Correo electrónico" {...field} />
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
        <div className="flex flex-row justify-between">
          <div >
            <FormItem>
              <Label className="flex" >
                <Checkbox {...form.register("remenberMe")} />
                <span className="ml-1">Recordarme</span>
              </Label>
            </FormItem>
          </div>
          <div>
            <Link href="/auth/password-recovery">
              <p className="text-sm hover:underline">¿Olvidaste tu contraseña?</p>
            </Link>
          </div>
        </div>
        <Button type="submit" className="hover:bg-blue-600">Iniciar sesión</Button>
        <div>
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
