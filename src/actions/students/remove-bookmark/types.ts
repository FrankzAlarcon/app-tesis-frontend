import { z } from "zod";
import { removeBookmarkSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof removeBookmarkSchema>
export type ReturnType = ActionState<InputType, { removed: boolean }>