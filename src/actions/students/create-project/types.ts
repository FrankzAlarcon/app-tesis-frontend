import { ActionState } from '@/lib/create-safe-action';
import { z } from "zod";
import { createProjectSchema } from './schema';


export type InputType = z.infer<typeof createProjectSchema>
export type ReturnType = ActionState<InputType, { created: boolean }>