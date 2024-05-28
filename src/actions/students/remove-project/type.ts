import { ActionState } from "@/lib/create-safe-action";
import { removeProjectSchema } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof removeProjectSchema>
export type ReturnType = ActionState<InputType, { removed: true }>