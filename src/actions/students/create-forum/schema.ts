import { z } from "zod";

export const createForumSchema = z.object({
  title: z.string(),
  description: z.string(),
  grade: z.number().int().min(1).max(5),
  businessId: z.string().uuid(),
})