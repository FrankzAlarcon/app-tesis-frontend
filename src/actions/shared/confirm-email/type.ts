import { z } from "zod";
import { confirmEmailSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof confirmEmailSchema>
export type ReturnType = ActionState<InputType, { confirmed: boolean }>