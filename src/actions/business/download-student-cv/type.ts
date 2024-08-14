import { z } from "zod";
import { downloadStudentCvSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof downloadStudentCvSchema>
export type ReturnType = ActionState<InputType, {
  file: any
}>