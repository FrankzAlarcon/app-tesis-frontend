import { ActionState } from "@/lib/create-safe-action";
import { addConvenantSchema } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof addConvenantSchema>
export type ReturnType = ActionState<InputType, { created: true }>
