"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { completeProfileSchema } from '@/schemas/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditProfileFormProps {
  completeProfile: {
    shortPresentation: string | null
    description: string | null
    faculty: string | null
    ira: string | null
  }
}

const EditProfileForm = ({
  completeProfile
}: EditProfileFormProps) => {
  // console.log(completeProfile)
  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      shortPresentation: completeProfile.shortPresentation ?? "",
      description: completeProfile.description ?? "",
      faculty: completeProfile.faculty ?? "",
      ira: completeProfile.ira ?? ""
    }
  })

  const onSubmit = (values: z.infer<typeof completeProfileSchema>) => {
    console.log(values)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'><Pencil className='w-4 h-4 mr-2' /><span>Editar perfil</span></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='shortPresentation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción corta</FormLabel>
                    <FormControl>
                      <Input placeholder='Desarrollador de software' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Soy un estudiante...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='faculty'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facultad</FormLabel>
                    <FormControl>
                      <Input placeholder='Ingeniería de Software' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ira'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IRA</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='32.45' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className='pt-2'>
                <DialogClose asChild>
                  <Button variant='outline'>Cancelar</Button>
                </DialogClose>
                <Button type='submit'>Guardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileForm