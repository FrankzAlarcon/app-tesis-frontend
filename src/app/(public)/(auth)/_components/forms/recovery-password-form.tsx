"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { recoveryPasswordSchema } from "@/schemas/auth.schema";


function RecoveryPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Form definition
  const form = useForm<z.infer<typeof recoveryPasswordSchema>>({
    resolver: zodResolver(recoveryPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // submit handler
  const onSubmit = async (values: z.infer<typeof recoveryPasswordSchema>) => {
    setError("");
    console.log("click submit");
    startTransition(() => {
      console.log(values);

      // recoverPassword(values)
      // .then((res) => {
      //   form.reset();
      //   setError(res?.error ?? '');
      // })
      // .catch((err) => {
      //   console.log("Error: ", err);
      // });
    });
  };

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
        <FormError message={error} />
        <Button
          type="submit"
          className={`hover:bg-blue-600 ${isPending ? "bg-blue-700/80 hover:bg-blue-700/80 cursor-not-allowed" : ""}`}
          disabled={isPending}
        >
          {isPending ? (
            <div>
              <div className="loader"></div>
            </div>
          ) : (
            "Enviar correo de recuperación"
          )}
        </Button>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm hover:underline">
            <Link href="/login">Volver al inicio de sesión</Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default RecoveryPasswordForm;
