import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingrese un correo electrónico válido.",
  }),
  password: z.string().min(1, {
    message: "Por favor, ingrese su contraseña.",
  }),
  // rememberMe: z.boolean(),
});

export const registerSchema = z.object({
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

export const recoveryPasswordSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingrese un correo electrónico válido.",
  }),
})