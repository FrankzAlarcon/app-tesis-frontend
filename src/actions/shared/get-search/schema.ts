import { z } from "zod";

export const searchSchema = z.object({
  text: z.string()
})