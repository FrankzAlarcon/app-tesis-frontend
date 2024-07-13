import { StudentFormStatus } from "@/enums/student-forms.enum";
import { z } from "zod";

const enumValues = Object.values(StudentFormStatus)

export const getStudentFormSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  filterField: z.string().optional(),
  filterValue: z.string().optional(),
  orderField: z.string().optional(),
  orderDirection: z.string().optional(),
  status: z.enum(['all', enumValues[0], enumValues[1], enumValues[2], enumValues[3]])
})