
import { z } from "zod";

export const addConvenantSchema = z.object({
  businessId: z.string(),
  covenantType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
})