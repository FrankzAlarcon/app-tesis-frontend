"use client"

import ConfirmDialog from "@/components/confirm-dialog"
import Link from "next/link"
import React, { useState } from 'react'
import NewCertification from "./new-certification"
import { Certification } from "@/types/student"
import { formatDate } from "@/lib/format-date"
import { FileBadge, Pencil, X } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { useAction } from "@/hooks/use-action"
import { removeCertification } from "@/actions/students/remove-certification"
import { useToast } from "@/components/ui/use-toast"

interface CertificationCardProps {
  certification: Certification
  enableEdition: boolean
  isPublic?: boolean
}

const CertificationCard = ({
  certification,
  enableEdition,
  isPublic = false
}: CertificationCardProps) => {
  const { toast } = useToast()
  const { execute, resetValues } = useAction(removeCertification, {
    onSuccess: () => {
      resetValues()
      toast({
        title: 'Certificación eliminada',
        duration: 4000,
        description: 'La certificación ha sido eliminada exitosamente',
      })
    }
  })
  const handleRemoveCertification = async () => {
    await execute({ certificationId: certification.id })
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
            enableEdition && !isPublic && (
              <ConfirmDialog asChild 
                alertTitle={`¿Estás seguro que quieres eliminar la certificación: ${certification.name}?`}
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
  isPublic?: boolean
}

const CertificationGroup = ({
  certifications = [],
  isPublic = false
}: CertificationGroupProps) => {
  const [enableEditMode, setEnableEditMode] = useState(false)

  const handleEnableEdit = () => {
    setEnableEditMode(!enableEditMode)
  }

  return (
    <div className='mt-4 bg-white rounded-lg shadow-md mx-4 p-2 lg:py-4 lg:px-8 lg:mr-8'>
      <div className="flex justify-between items-center pb-2">
        <p className=' text-xl font-bold'>Cursos y certificaciones</p>
        {
          !isPublic && (
            <Toggle asChild>
              <Button aria-label="Habilitar edición" variant='ghost' onClick={() => handleEnableEdit()}>
                <Pencil className="w-5 h-5" />
              </Button>
            </Toggle>
          )
        }
      </div>
      <div>
        <div className='grid gap-4 md:grid-cols-2'>
          {
            certifications.map(certification => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                enableEdition={enableEditMode}
              />
            ))
          }
          { !isPublic && (<NewCertification />)}
        </div>
      </div>
    </div>   
  )
}

export default CertificationGroup