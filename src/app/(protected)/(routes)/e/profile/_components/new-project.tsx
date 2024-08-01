"use client"

import { addProject } from "@/actions/students/create-project"
import FormError from "@/components/form-utilities/form-error"
import FormSubmit from "@/components/form-utilities/form-submit"
import Loader from "@/components/loader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAction } from "@/hooks/use-action"
import { useCurrentUser } from "@/hooks/use-current-user"
import { createProjectSchema } from "@/schemas/profile.schema"
import { ProjectSkill } from "@/types/student"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronsUpDown, CirclePlus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface NewProjectProps {
  skills: ProjectSkill[]
}

const NewProject = ({
  skills
}: NewProjectProps) => {
  const { toast } = useToast()
  const [openModal, setOpenModal] = useState(false)
  const [openSkillPopover, setOpenSkillPopover] = useState(false)
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      skills: []
    },
  })
  const { execute, error, resetValues } = useAction(addProject, {
    onSuccess: () => {
      setOpenModal(false)
      resetValues()
      form.reset()
      toast({
        title: 'Certificación creada',
        duration: 4000,
        description: 'La certificación ha sido creada exitosamente',
      })
    },
  })
  const onSubmit = async (values: z.infer<typeof createProjectSchema>) => {
    await execute(values)
  }
  const handleCloseDialog = (value: boolean) => {
    setOpenModal(value)
    resetValues()
    form.reset()
  }
  const handleOnSelectSkill = (skill: ProjectSkill) => {
    const skillsIds = form.getValues('skills')
    if (skillsIds.some((item) => item.id === skill.id)) return
    form.setValue('skills', [...skillsIds, {
      id: skill.id,
      name: skill.name
    }])
    setOpenSkillPopover(false)
  }

  const handleOnRemoveSkill = (skill: ProjectSkill) => {
    form.setValue('skills', form.getValues('skills').filter((item) => item.id !== skill.id))
  }
  return (
    <Dialog open={openModal} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button className="border-dashed min-h-[109px]" variant='outline'><CirclePlus strokeWidth={1} className='w-10 h-10 mr-2' /><span className="text-xl">Nuevo proyecto</span></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo proyecto</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              // action={onSubmit}
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-2'
            >
              <FormField
                control={form.control}
                name='name'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder='Ej. API REST en Express' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Ej. Esta API fue desarrollada...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='url'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL del proyecto</FormLabel>
                    <FormControl>
                      <Input placeholder='Ej. https://github.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='skills'
                disabled={form.formState.isSubmitting}
                render={() => (
                  <FormItem>
                    <FormLabel>Habilidades</FormLabel>
                    <Popover open={openSkillPopover} onOpenChange={setOpenSkillPopover}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role="combobox"
                            className="w-full flex justify-between"
                          >
                            Seleccionar habilidad
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandInput placeholder="Buscar habilidad..." />
                          <CommandEmpty>Habilidad no encontrada</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {
                                skills.map((skill) => (
                                  <CommandItem
                                    key={skill.id}
                                    value={skill.name}
                                    onSelect={() => handleOnSelectSkill(skill)}
                                  >
                                    <span>{skill.name}</span>
                                  </CommandItem>
                                ))
                              }
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {
                      form.getValues('skills')?.map((skill) => (
                        <Badge key={skill.id} className='mr-1 hover:bg-primary'>
                          <span>{skill.name}</span>
                          <Button
                            className="h-4 w-4 text-white p-0 ml-1"
                            onClick={() => handleOnRemoveSkill(skill)}
                          >
                            <X aria-label="Eliminar habilidad" className="text-white h-4 w-4" />
                          </Button>
                        </Badge>
                      ))
                    }
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FormError error={error} />}
              <DialogFooter className='pt-2 gap-2'>
                <DialogClose asChild>
                  <Button className='sm:min-w-24' variant='outline'>Cancelar</Button>
                </DialogClose>
                <FormSubmit isSubmitting={form.formState.isSubmitting} />
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewProject