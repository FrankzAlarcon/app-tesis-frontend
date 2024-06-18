import { z } from "zod";

export const getSubjectsByCareerSchema = z.object({
  careerId: z.string().uuid()
});