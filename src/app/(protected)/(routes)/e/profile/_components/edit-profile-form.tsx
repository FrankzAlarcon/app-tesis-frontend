"use client"

import { updateProfile } from '@/actions/students/update-profile'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useProfile } from '@/hooks/use-profile'
import { completeProfileSchema } from '@/schemas/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const user = useCurrentUser()
  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      shortPresentation: completeProfile.shortPresentation ?? "",
      description: completeProfile.description ?? "",
      faculty: completeProfile.faculty ?? "",
      ira: completeProfile.ira ?? ""
    },
  })

  const onSubmit = async (values: z.infer<typeof completeProfileSchema>) => {
    // check if values are different from the ones in the profile
    const shortPresentationHasChanged = values.shortPresentation !== completeProfile.shortPresentation
    const descriptionHasChanged = values.description !== completeProfile.description
    const facultyHasChanged = values.faculty !== completeProfile.faculty
    const iraHasChanged = values.ira !== completeProfile.ira
    if (!shortPresentationHasChanged && !descriptionHasChanged && !facultyHasChanged && !iraHasChanged) {
      setOpenModal(false)
      return 
    }
    if (!user?.accessToken) return
    await updateProfile(values, user.accessToken)
    router.refresh()
    setOpenModal(false)
  }
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
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
                disabled={form.formState.isSubmitting}
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
                disabled={form.formState.isSubmitting}
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
                disabled={form.formState.isSubmitting}
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
                disabled={form.formState.isSubmitting}
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
              <DialogFooter className='pt-2 gap-2'>
                <DialogClose asChild>
                  <Button className='sm:min-w-24' variant='outline'>Cancelar</Button>
                </DialogClose>
                <Button className='sm:min-w-24' type='submit'>
                  {form.formState.isSubmitting ? (
                    <Loader className='text-white h-5 w-5' />
                  ) : 'Guardar'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileForm