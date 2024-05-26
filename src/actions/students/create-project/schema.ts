import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string({
    required_error: 'El nombre el obligatorio',
    invalid_type_error: 'El nombre es inválido'
  }).trim().min(1, 'El nombre es muy corto'),
  description: z.string({
    required_error: 'La descripción el obligatoria',
    invalid_type_error: 'La descripción es inválida'
  }).trim().min(1, 'La descripción es muy corta'),
  url: z.string({
    required_error: 'La URL es obligatoria',
    invalid_type_error: 'La URL es inválida'
  }).trim().url('La URL es inválida').min(1, 'La URL es obligatoria'),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string()
  }))
})