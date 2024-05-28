import { z } from "zod";
import { createCertificationSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof createCertificationSchema>
export type ReturnType = ActionState<InputType, { created: boolean }>
