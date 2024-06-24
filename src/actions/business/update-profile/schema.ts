import { z } from "zod";

export const completeProfileSchema = z.object({
  description: z.string(),
  shortPresentation: z.string(),
  province: z.string(),
  city: z.string(),
  phone: z.string(),
})