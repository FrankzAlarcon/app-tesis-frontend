import { z } from "zod";
import { getStudentFormSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { IStudentForm } from "@/types/forms";

export type InputType = z.infer<typeof getStudentFormSchema>
export type ReturnType = ActionState<InputType, {
  total: number;
  totalPages: number;
  data: IStudentForm[]
}>