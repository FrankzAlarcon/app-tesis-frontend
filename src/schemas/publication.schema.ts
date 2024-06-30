import { Modality } from "@/enums/modality.enum";
import { z } from "zod";

export const createPublicationSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  modality: z.enum([Modality.PRESENTIAL, Modality.REMOTE, Modality.HYBRID], {
    errorMap: (error) => ({
      message: 'Modalidad no válida'
    })
  }),
  entryTime: z.string().refine((value) => {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
  }, {
    message: 'Hora de entrada no válida',
  }),
  departureTime: z.string().refine((value) => {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
  }, {
    message: 'Hora de salida no válida',
  }),
  benefits: z.string().min(10, 'Los beneficios deben tener al menos 10 caracteres'),
  requirements: z.string().min(10, 'Los requisitos deben tener al menos 10 caracteres'),
  skillsIds: z.array(z.string()).min(0),
  notRegisteredSkills: z.array(z.string()).min(0),
  remuneration: z.string().optional().refine((value) => {
    if (!value) return true
    return !isNaN(Number(value))
    }, {
    message: 'La remuneración debe ser un número'
  }),
})