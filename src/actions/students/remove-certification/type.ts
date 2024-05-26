import { z } from "zod";
import { removeCertificationSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof removeCertificationSchema>
export type ReturnType = ActionState<InputType, { removed: true }>