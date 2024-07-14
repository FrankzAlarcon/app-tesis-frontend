import { z } from "zod";

export const uploadPendingSchema = z.object({
  url: z.string(),
});