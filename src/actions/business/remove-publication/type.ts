import { ActionState } from "@/lib/create-safe-action";
import { removePublicationSchema } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof removePublicationSchema>
export type ReturnType = ActionState<InputType, { removed: true }>