import { z } from "zod";
import { createForumSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof createForumSchema>;
export type ReturnType = ActionState<InputType, { created: boolean }>;