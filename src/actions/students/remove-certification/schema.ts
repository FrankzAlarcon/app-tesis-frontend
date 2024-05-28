import { z } from "zod";

export const removeCertificationSchema = z.object({
  certificationId: z.string()
});