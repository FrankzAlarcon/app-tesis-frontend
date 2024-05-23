"use client"

import Loader from '@/components/loader'
import ConfirmDialog from "@/components/confirm-dialog"
import Link from "next/link"
import React, { useState } from 'react'
import { Certification } from "@/types/student"
import { formatDate } from "@/lib/format-date"
import { FileBadge, Pencil, X } from "lucide-react"
import { addCertification } from '@/actions/students/add-certification'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import { createCertificationSchema } from '@/schemas/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { CalendarIcon, CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { removeProject } from "@/actions/students/remove-project"
import { Toggle } from "@/components/ui/toggle"

const NewCertification = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const form = useForm<z.infer<typeof createCertificationSchema>>({
    resolver: zodResolver(createCertificationSchema),
    defaultValues: {
      name: '',
      url: '',
      emissionDate: new Date(),
      issuingBusiness: ''
    },
  })
  const handleCloseDialog = (value: boolean) => {
    setOpenModal(value)
    form.reset()
  }

  const onSubmit = async (values: any) => {
    console.log(values)
    if (!user) return
    await addCertification(values, user.accessToken)
    setOpenModal(false)
    router.refresh()
    
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
                    <FormMessage className="text-xs" />
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
                    <FormMessage className="text-xs" />
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
                    <FormMessage className="text-xs" />
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

interface CertificationCardProps {
  certification: Certification
  enableEditon: boolean
}

const CertificationCard = ({
  certification,
  enableEditon
}: CertificationCardProps) => {
  const user = useCurrentUser()
  const router = useRouter()
  const handleRemoveCertification = async () => {
    if (!user?.accessToken) {
      return
    }
    await removeProject(certification.id, user.accessToken)
    router.refresh()
  }

  return (
    <Card className="flex items-center gap-2">
      <div className="flex items-center justify-center">
        <FileBadge className="h-10 w-10 ml-6" />
      </div>
      <div className="w-full">
        <CardHeader className="w-full space-y-0 pr-6 py-2 flex flex-row items-start justify-between">
          <div className="w-[calc(_100%-24px)]">
            <Link href={certification.url} target="_blank" className="hover:underline hover:text-primary duration-100" >
              <CardTitle className="text-lg">{certification.name}</CardTitle>
              {certification.description && <CardDescription>{certification.description}</CardDescription>}
            </Link>
          </div>
          {
            enableEditon && (
              <ConfirmDialog asChild 
                alertTitle="¿Estás seguro que quieres eliminar esta certificación?"
                alertDescription="Esta acción no se puede deshacer."
                onConfirm={handleRemoveCertification}
              >
                <Button variant='outline' className="w-6 h-6 p-0 border-none">
                  <X className="h-6 w-6 text-gray-800" />
                </Button>
              </ConfirmDialog>
            )
          }
        </CardHeader>
        <CardContent className="pr-6 pb-2">
          <p className="text-sm text-muted-foreground">{certification.issuingBusiness}</p>
          <p className="text-sm text-muted-foreground">Expedición: {formatDate(certification.emissionDate)}</p>
        </CardContent>
      </div>
    </Card>
  )
}


interface CertificationGroupProps {
  certifications: Certification[]
}

const CertificationGroup = ({
  certifications = []
}: CertificationGroupProps) => {
  const [enableEditMode, setEnableEditMode] = useState(false)

  const handleEnableEdit = () => {
    if (enableEditMode) {
      setEnableEditMode(false)
    } else {
      setEnableEditMode(true)
    }
  }

  return (
    <div className='mt-4 bg-white rounded-lg shadow-md mx-4 p-2 lg:py-4 lg:px-8 lg:mx-8'>
      <div className="flex justify-between items-center pb-2">
        <p className=' text-xl font-bold'>Cursos y certificaciones</p>
        <Toggle className="p-0">
          <Button aria-label="Habilitar edición" variant='ghost' onClick={() => handleEnableEdit()}>
            <Pencil className="w-5 h-5" />
          </Button>
        </Toggle>
      </div>
      <div>
        <div className='grid gap-4 md:grid-cols-2'>
          {
            certifications.map(certification => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                enableEditon={enableEditMode}
              />
            ))
          }
          <NewCertification />
        </div>
      </div>
    </div>   
  )
}

export default CertificationGroup