import { z } from "zod";

export const getBusinessSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  filterField: z.string().optional(),
  filterValue: z.string().optional(),
  orderField: z.string().optional(),
  orderDirection: z.string().optional(),
})