import { z } from "zod"

export const completeProfileSchema = z.object({
  shortPresentation: z.string(),
  description: z.string(),
  faculty: z.string(),
  ira: z.string()
})

export const createProjectSchema = z.object({
  name: z.string().min(1, 'El nombre el obligatorio'),
  description: z.string().min(1, 'La descripción el obligatorio'),
  url: z.string().url('La URL no es válida').min(1, 'La URL el obligatoria'),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string()
  }))
})

export const createCertificationSchema = z.object({
  name: z.string().min(1, 'El nombre el obligatorio'),
  emissionDate: z.date(),
  url: z.string().url('La URL no es válida').min(1, 'La URL el obligatoria'),
  issuingBusiness: z.string().min(1, 'El nombre de la empresa el obligatorio')
})

export const completesBusinessProfileSchema = z.object({
  description: z.string(),
  shortPresentation: z.string(),
  province: z.string(),
  city: z.string(),
  phone: z.string().refine((value) => {
    if (value === '') return true
    return /^\d$/.test(value)
  })
})