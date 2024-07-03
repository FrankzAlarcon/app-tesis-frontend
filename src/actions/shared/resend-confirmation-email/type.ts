import { z } from "zod";
import { resendConfirmationEmailSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof resendConfirmationEmailSchema>
export type ReturnType = ActionState<InputType, { sent: boolean }>