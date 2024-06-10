import { z } from "zod";

export const removePostulationSchema = z.object({
  postulationId: z.string()
});