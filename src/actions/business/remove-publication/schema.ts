import { z } from "zod";

export const removePublicationSchema = z.object({
  publicationId: z.string()
})