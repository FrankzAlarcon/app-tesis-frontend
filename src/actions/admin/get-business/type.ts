import { z } from "zod";
import { getBusinessSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Business } from "@/types/business";

export type InputType = z.infer<typeof getBusinessSchema>
export type ReturnType = ActionState<InputType, {
  total: number;
  totalPages: number;
  data: Business[]
}>