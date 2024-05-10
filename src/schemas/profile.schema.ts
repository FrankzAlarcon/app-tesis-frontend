import { z } from "zod"

export const completeProfileSchema = z.object({
  shortPresentation: z.string(),
  description: z.string(),
  faculty: z.string(),
  ira: z.string()
})