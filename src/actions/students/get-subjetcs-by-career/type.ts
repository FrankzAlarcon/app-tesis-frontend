import { ActionState } from "@/lib/create-safe-action";
import { getSubjectsByCareerSchema } from "./schema";
import { z } from "zod";
import { Subject } from "@/types/subjects";

export type InputType = z.infer<typeof getSubjectsByCareerSchema>
export type ReturnType = ActionState<InputType, Subject[][]>