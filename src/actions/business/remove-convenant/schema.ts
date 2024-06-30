import { z } from "zod";

export const removeConvenantSchema = z.object({
  convenantId: z.string()
})