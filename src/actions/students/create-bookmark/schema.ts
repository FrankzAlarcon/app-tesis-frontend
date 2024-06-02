import { z } from "zod";

export const createBookmarkSchema = z.object({
  publicationId: z.string({
    required_error: 'El id de la publicación es obligatorio',
    invalid_type_error: 'El id de la publicación es inválido'
  }),
  path: z.string({
    required_error: 'La ruta es obligatoria',
    invalid_type_error: 'La ruta es inválida'
  }).optional()
})