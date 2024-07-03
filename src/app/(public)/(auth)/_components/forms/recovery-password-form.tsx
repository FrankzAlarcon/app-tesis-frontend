"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAction } from "@/hooks/use-action";
import { recoveryPassword } from "@/actions/shared/recovery-password";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { resendConfirmationEmail } from "@/actions/shared/resend-confirmation-email";


function RecoveryPasswordForm() {
  const { toast } = useToast()
  const [showResendConfirmation, setShowResendConfirmation] = useState(false)
  const { execute: executeResend, isLoading: isLoadingReset } = useAction(resendConfirmationEmail, {
    onSuccess: () => {
      toast({
        title: 'Se ha reenviado el correo de confirmación',
        description: 'Por favor revisa tu correo electrónico',
        duration: 6000,
        variant: 'default'
      })
    },
  })
  const { execute, isLoading, error } = useAction(recoveryPassword, {
    onError: (error) => {
      if (error === 'Email no verificado') {
        setShowResendConfirmation(true)
        toast({
          title: error,
          description: 'Por favor verifica tu correo electrónico',
          duration: 6000,
          variant: 'destructive'
        })
        return
      }
      toast({
        title: 'Se ha enviado un correo de recuperación de contraseña',
        description: 'Por favor revisa tu correo electrónico',
        duration: 6000,
        variant: 'default'
      })
    },
    onSuccess: () => {
      toast({
        title: 'Se ha enviado un correo de recuperación de contraseña',
        description: 'Por favor revisa tu correo electrónico',
        duration: 6000,
        variant: 'default'
      })
    }
  })
  // Form definition
  const form = useForm<z.infer<typeof recoveryPasswordSchema>>({
    resolver: zodResolver(recoveryPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // submit handler
  const onSubmit = async (values: z.infer<typeof recoveryPasswordSchema>) => {
    await execute(values)
  };

  const handleResendConfirmationEmail = async () => {
    console.log({ email: form.getValues().email })
    await executeResend({
      email: form.getValues().email
    })
    setShowResendConfirmation(false)
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
                <Input placeholder="Correo electrónico" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {error === 'Email no verificado' && <FormError message={error} />}
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
            "Enviar correo de recuperación"
          )}
        </Button>
        { showResendConfirmation && (
          <Button type="button" onClick={handleResendConfirmationEmail} className="bg-green-500 hover:bg-green-400">
            {isLoadingReset ? (
              <div>
                <div className="loader"></div>
              </div>
            ) : (
              "Reenviar correo de confirmación"
            )}
          </Button>
        )}
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
