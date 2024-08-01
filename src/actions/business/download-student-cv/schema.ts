import { z } from "zod";

export const downloadStudentCvSchema = z.object({
  postulationId: z.string(),
})