import { z } from "zod";
import { saveFormPdfSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof saveFormPdfSchema>;
export type ReturnType = ActionState<InputType, { saved: boolean }>;