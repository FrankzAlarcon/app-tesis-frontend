import { z } from "zod";
import { createBookmarkSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof createBookmarkSchema>
export type ReturnType = ActionState<InputType, { created: boolean }>