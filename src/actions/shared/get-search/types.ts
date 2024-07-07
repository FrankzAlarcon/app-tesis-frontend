import { z } from "zod";
import { searchSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export interface SearchPayload {
  students: {
    id: string;
    name: string;
    studentId: string;
    shortPresentation: string;
  }[];
  business: {
    id: string;
    name: string;
    businessId: string;
    shortPresentation: string;
  }[];
}

export type InputType = z.infer<typeof searchSchema>;
export type ReturnType = ActionState<InputType, SearchPayload>;
