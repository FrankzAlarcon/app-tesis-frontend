import { z } from "zod";

export const saveFormPdfSchema = z.object({
  formId: z.string(),
  data: z.string(),
  formData: z.any(),
})