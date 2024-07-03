import { z } from "zod";

export const confirmEmailSchema = z.object({
  token: z.string()
})