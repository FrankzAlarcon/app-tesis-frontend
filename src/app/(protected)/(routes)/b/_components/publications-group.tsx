"use client"

import { removePublicationMock } from "@/actions/business/remove-publication"
import ConfirmDialog from "@/components/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAction } from "@/hooks/use-action"
import { ShortPublication } from "@/types/business"
import { X, User } from "lucide-react"
import { formatDistanceEs } from "@/lib/date-fns/format-distance-es"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ShortPublicationCardProps {
  publication: ShortPublication
  enableEdition: boolean
  large?: boolean
}

export const PublicationCard = ({
  publication,
  enableEdition,
  large = false
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
    <Card className="flex flex-col justify-between w-full h-auto">
      <CardHeader className="w-full py-2 flex flex-row justify-between items-start">
        <div className="pt-1">
          <CardTitle className="flex gap-1 items-center text-base">{publication.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            <span className="block">{publication.modality}</span>
            <span className="block">{formatDistanceEs(publication.createdAt)}</span>
          </CardDescription>
        </div>
        {
          enableEdition && (
            <ConfirmDialog asChild
              alertTitle={`¿Eliminar la publicación "${publication.title}"?`}
              alertDescription="Esta acción no se puede deshacer."
              onConfirm={handleRemovePublication}
            >
              <Button variant='outline' className="w-6 h-6 mt-0 p-0 border-none">
                <X className="h-6 w-6 text-gray-800" />
              </Button>
            </ConfirmDialog>
          )
        }
      </CardHeader >
      <CardContent className={cn("pb-2", large && "sm:flex sm:justify-between")}>
        <div className="flex flex-col gap-2 mt-2 sm:w-full">
          {
            publication.candidatesCount !== undefined && (
              <div className="flex flex-row gap-1">
                <User className="h-4 w-4" />
                <span className="text-sm">{publication.candidatesCount} candidatos ideales</span>
              </div>
            )
          }
          {
            publication.postulationsCount !== undefined && (
              <div className="flex flex-row gap-1">
                <User className="h-4 w-4" />
                <span className="text-sm">{publication.postulationsCount} postulantes</span>
              </div>
            )
          }
        </div>
        <div className={cn("w-full flex justify-center pt-4",
          large && "sm:w-40"
        )}>
          <Link href={`/b/publications/${publication.id}`}
            className="w-full sm:w-40 text-center py-2 px-4 text-primary border border-primary bg-background hover:bg-blue-700 hover:text-white rounded-md transition duration-300 ease-in-out"
          >
            Ver publicación
          </Link>
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
      <div className=''>
        <div className="flex flex-col justify-center gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
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
              <p>Aún no has creado pulicaciones!</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PublicationsGroup