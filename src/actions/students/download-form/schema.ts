import { StudentFormStatus } from "@/enums/student-forms.enum";
import { z } from "zod";

export const downloadFormSchema = z.object({
  studentFormId: z.string(),
  status: z.enum([StudentFormStatus.EMITIDO, StudentFormStatus.PENDIENTE, StudentFormStatus.RECHAZADO, StudentFormStatus.APROBADO]),
})