import { z } from "zod";
import { downloadFormSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof downloadFormSchema>
export type ReturnType = ActionState<InputType, { file: any }>