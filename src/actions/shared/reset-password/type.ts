import { z } from "zod";
import { resetPasswordSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof resetPasswordSchema>
export type ReturnType = ActionState<InputType, { success: true }>