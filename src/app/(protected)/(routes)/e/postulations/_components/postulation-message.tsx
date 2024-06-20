"use client"

import { createPostulation } from "@/actions/students/create-postulation"
import FormActionSubmit from "@/components/form-utilities/form-action-submit"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { postulationSchema } from "@/schemas/postulation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { XCircle } from "lucide-react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface PostulationMessageProps {
  publicationId: string
  wasAlreadyPostulated: boolean
}

const initialState = {
  message: undefined,
  cv: undefined,
  publicationId: null
}

const PostulationMessage = ({
  publicationId,
  wasAlreadyPostulated
}: PostulationMessageProps) => {
  const form = useForm<z.infer<typeof postulationSchema>>({
    resolver: zodResolver(postulationSchema),
    defaultValues: {
      message: '',
    }
  })
  const [state, formAction] = useFormState(createPostulation, {
    ...initialState,
    publicationId
  })

  return (
    <div className="p-2">
      <p className="font-bold">Postula ahora!</p>
      {
        !wasAlreadyPostulated ? (
          <Form {...form}>
            <form action={formAction} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje:</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                (state as any)?.message && (
                  <p
                    className={cn("text-xs font-medium text-destructive flex gap-1 items-center border border-rose-500 bg-rose-500/10 rounded-md p-1.5")}
                  >
                    <XCircle size={16} /> {(state as any)?.message[0]}
                  </p>
                )
              }
              <FormLabel>Carga tu CV:</FormLabel>
              <Input id="cv" name="cv" type="file" />
              {
                (state as any)?.cv && (
                  <p
                    className={cn("text-xs font-medium text-destructive flex gap-1 items-center border border-rose-500 bg-rose-500/10 rounded-md p-1.5")}
                  >
                    <XCircle size={16} /> {(state as any)?.cv}
                  </p>
                )
              }
              <div className="flex justify-end w-full">
                <FormActionSubmit />
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex justify-center items-center gap-2 py-4">
            <p className="text-xl font-bold text-primary">Ya postulaste a esta publicación 🚀</p>
          </div>
        )
      }
    </div>
  )
}

export default PostulationMessage