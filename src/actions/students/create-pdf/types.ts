import { z } from "zod";
import { faa119FormSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof faa119FormSchema>
export type ReturnType = ActionState<InputType, { data: any }>