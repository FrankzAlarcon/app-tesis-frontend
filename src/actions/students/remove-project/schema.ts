import { z } from "zod";

export const removeProjectSchema = z.object({
  projectId: z.string()
})