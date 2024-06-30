import { ActionState } from "@/lib/create-safe-action";
import { removeConvenantSchema } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof removeConvenantSchema>
export type ReturnType = ActionState<InputType, { removed: true }>
