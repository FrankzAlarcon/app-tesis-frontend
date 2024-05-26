import { z } from "zod";

export const createCertificationSchema = z.object({
  name: z.string().trim().min(1, 'El nombre el obligatorio'),
  emissionDate: z.date(),
  url: z.string().trim().url('La URL no es válida').min(1, 'La URL el obligatoria'),
  issuingBusiness: z.string().trim().min(1, 'El nombre de la empresa el obligatorio')
})