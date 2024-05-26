"use client"

import { Calendar } from '@/components/ui/calendar'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createCertificationSchema } from '@/schemas/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { CalendarIcon, CirclePlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { addCertification } from '@/actions/students/create-certification'
import FormSubmit from '@/components/form-utilities/form-submit'
import FormError from '@/components/form-utilities/form-error'
import { useAction } from '@/hooks/use-action'
import { useToast } from '@/components/ui/use-toast'

const NewCertification = () => {
  const [openModal, setOpenModal] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof createCertificationSchema>>({
    resolver: zodResolver(createCertificationSchema),
    defaultValues: {
      name: '',
      url: '',
      emissionDate: new Date(),
      issuingBusiness: ''
    },
  })
  const { error, execute, resetValues } = useAction(addCertification, {
    onSuccess: () => {
      setOpenModal(false)
      resetValues()
      form.reset()
      toast({
        title: 'Certificación creada',
        duration: 4000,
        description: 'La certificación ha sido creada exitosamente',
      })
    }
  })
  const handleCloseDialog = (value: boolean) => {
    setOpenModal(value)
    resetValues()
    form.reset()
  }

  const onSubmit = async (values: z.infer<typeof createCertificationSchema>) => {
    await execute(values)
    
  }
  return (
    <Dialog open={openModal} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button className="border-dashed min-h-[93px]" variant='outline'><CirclePlus strokeWidth={1} className='w-10 h-10 mr-2' /><span className="text-xl">Nueva certificación</span></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo certificado</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='name'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder='Ej. Programación básica' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='issuingBusiness'
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa que emite</FormLabel>
                    <FormControl>
                      <Input placeholder='Ej. Platzi' {...field} />
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
                    <FormLabel>URL del certificado</FormLabel>
                    <FormControl>
                      <Input placeholder='Ej. https://github.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />            
              <FormField
                control={form.control}
                name="emissionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de emisión del certificado</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Seleccionar fecha:</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus

                        />
                      </PopoverContent>
                    </Popover>
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

export default NewCertification