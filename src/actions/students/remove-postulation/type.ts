import { z } from "zod";
import { removePostulationSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof removePostulationSchema>
export type ReturnType = ActionState<InputType, { removed: true }>