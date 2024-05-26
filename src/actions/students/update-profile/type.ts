import { z } from "zod";
import { completeProfileSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof completeProfileSchema>
export type ReturnType = ActionState<InputType, { updated: boolean }>