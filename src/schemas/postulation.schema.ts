import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["application/pdf"]

export const postulationSchema = z.object({
  message: z.string().min(1, {
    message: "Por favor, ingrese un mensaje.",
  }),
  // cv: z.instanceof(File, {
  //   message: "Por favor, cargue un archivo.",
  // })
  // .refine((file) => {
  //   return !file || file.size <= MAX_UPLOAD_SIZE
  // }, "El archivo debe pesar menos de 3MB.")
  // .refine((file) => {
  //   return ACCEPTED_FILE_TYPES.includes(file.type)
  // }, "El archivo debe ser un PDF.")
})