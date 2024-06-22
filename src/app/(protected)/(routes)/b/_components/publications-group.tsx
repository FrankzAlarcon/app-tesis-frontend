"use client"

import { removePublicationMock } from "@/actions/business/remove-publication"
import ConfirmDialog from "@/components/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAction } from "@/hooks/use-action"
import { ShortPublication } from "@/types/business"
import { X, User } from "lucide-react"
import { useState } from "react"
// import { calculateEntryDate } from "@/lib/format-date"
import { differenceInWeeks } from "date-fns"

interface ShortPublicationCardProps {
  publication: ShortPublication
  enableEdition: boolean
}

const PublicationCard = ({
  publication,
  enableEdition
}: ShortPublicationCardProps) => {
  const { toast } = useToast()
  const { execute, resetValues } = useAction(removePublicationMock, {
    onSuccess: () => {
      resetValues()
      toast({
        title: 'Publicación eliminada',
        duration: 4000,
        description: 'La publicación ha sido eliminada correctamente.',
      })
    }
  })

  const handleRemovePublication = async () => {
    await execute({ publicationId: publication.id })
  }

  return (
    <Card className="relative min-w-64 h-[230px] flex flex-col justify-center ">
      <CardHeader className="w-full py-2 ">
        <div>
          <CardTitle className="flex gap-1 items-center text-base">{publication.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            <p>{publication.city} ({publication.modality})</p>
            <p> Hace {differenceInWeeks(new Date(), new Date(publication.createdAt))} semanas</p>

          </CardDescription>
        </div >
        {
          enableEdition && (
            <ConfirmDialog asChild
              alertTitle={`¿Eliminar la publicación "${publication.title}"?`}
              alertDescription="Esta acción no se puede deshacer."
              onConfirm={handleRemovePublication}
            >
              <Button variant='outline' className="w-6 h-6 p-0 border-none absolute top-0 right-1 ">
                <X className="h-6 w-6 text-gray-800" />
              </Button>
            </ConfirmDialog>
          )
        }
      </CardHeader >
      <CardContent className="pb-2">
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-row gap-1">
            <User className="h-4 w-4" />
            <span className="text-sm">{publication.candidateCount} candidatos ideales</span>
          </div>
          <div className="flex flex-row gap-1">
            <User className="h-4 w-4" />
            <span className="text-sm">{publication.postulationCount} postulantes</span>
          </div>
        </div>
        <div>
          <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:text-primary">
            Ver publicación
          </Button>
        </div>
      </CardContent>
    </Card >
  )
}

interface PublicationsGroupProps {
  publications: ShortPublication[]
}

const PublicationsGroup = ({
  publications = [],
}: PublicationsGroupProps) => {

  return (
    <div className="pt-8">
      <Button
        className="absolute m-3 top-0 right-0 border-primary text-primary hover:text-primary"
        variant="outline"
      >
        Crear publicación
      </Button>
      <div className=''>
        <div className="flex flex-row justify-center md:justify-start gap-4 flex-wrap">
          {
            publications.map(publication => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                enableEdition
              />
            ))
          }
        </div>
        {
          publications.length === 0 && (
            <div className='text-center text-gray-500'>
              <p>No hay proyectos publicados</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PublicationsGroup