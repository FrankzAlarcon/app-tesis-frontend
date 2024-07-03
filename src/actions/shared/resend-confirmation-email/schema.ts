import { z } from "zod";

export const resendConfirmationEmailSchema = z.object({
  email: z.string().email()
})