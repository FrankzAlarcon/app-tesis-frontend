"use client"

import { updateProfile } from '@/actions/business/update-profile'
import FormError from '@/components/form-utilities/form-error'
import FormSubmit from '@/components/form-utilities/form-submit'
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
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { completesBusinessProfileSchema } from '@/schemas/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditProfileFormProps {
  completeProfile: {
    shortPresentation: string | null
    description: string | null
    city: string | null
    province: string | null
    phone: string | null
  }
}

const EditProfileForm = ({
  completeProfile
}: EditProfileFormProps) => {
  console.log(completeProfile)
  const { toast } = useToast()
  const [openModal, setOpenModal] = useState(false)
  const form = useForm<z.infer<typeof completesBusinessProfileSchema>>({
    resolver: zodResolver(completesBusinessProfileSchema),
    defaultValues: {
      shortPresentation: completeProfile.shortPresentation ?? "",
      description: completeProfile.description ?? "",
      city: completeProfile.city ?? "",
      province: completeProfile.province ?? "",
      phone: completeProfile.phone ?? ""
    },

  })

  useEffect(() => {
    form.reset({
      shortPresentation: completeProfile.shortPresentation ?? "",
      description: completeProfile.description ?? "",
      city: completeProfile.city ?? "",
      province: completeProfile.province ?? "",
      phone: completeProfile.phone ?? ""
    })
  }, [form, form.reset, completeProfile])

  const { error, execute, resetValues } = useAction(updateProfile, {
    onSuccess: () => {
      setOpenModal(false)
      resetValues()
      form.reset()
      
      toast({
        title: 'Perfil actualizado',
        duration: 4000,
        description: 'Tu perfil ha sido actualizado exitosamente',
      })
    }
  })

  const onSubmit = async (values: z.infer<typeof completesBusinessProfileSchema>) => {
    // check if values are different from the ones in the profile
    const shortPresentationHasChanged = values.shortPresentation !== completeProfile.shortPresentation
    const descriptionHasChanged = values.description !== completeProfile.description
    const provinceHasChanged = values.province !== completeProfile.province
    const cityHasChanged = values.city !== completeProfile.city
    const phoneHasChanged = values.phone !== completeProfile.phone

    console.log(values)
    if (!shortPresentationHasChanged && !descriptionHasChanged && !provinceHasChanged && !cityHasChanged && !phoneHasChanged) {
      setOpenModal(false)
      return 
    }
    await execute(values)
  }

  const handleOnOpenChange = (isOpen: boolean) => {
    setOpenModal(isOpen)
    form.reset({
      shortPresentation: completeProfile.shortPresentation ?? "",
      description: completeProfile.description ?? "",
      city: completeProfile.city ?? "",
      province: completeProfile.province ?? "",
      phone: completeProfile.phone ?? ""
    })
  }
  return (
    <Dialog open={openModal} onOpenChange={handleOnOpenChange}>
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
                      <Input placeholder='Empresa de TI' {...field} />
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
                      <Textarea placeholder='Soy un negocio...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='province'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <FormControl>
                      <Input placeholder='Pichincha...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Quito...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Quito...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='0987654321...' {...field} />
                    </FormControl>
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

export default EditProfileForm