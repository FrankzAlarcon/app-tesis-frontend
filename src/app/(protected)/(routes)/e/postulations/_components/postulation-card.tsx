"use client"

import { removePostulation } from '@/actions/students/remove-postulation'
import ConfirmDialog from '@/components/confirm-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { formatDistanceEs } from '@/lib/date-fns/format-distance-es'
import { formatDateComplete } from '@/lib/format-date'
import { PostulationCard as PostulationCardType } from '@/types/postulations'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PostulationCardProps {
  postulation: PostulationCardType
}

const PostulationCard = ({
  postulation
}: PostulationCardProps) => {
  const { toast } = useToast()
  const { execute, resetValues } = useAction(removePostulation, {
    onSuccess: () => {
      resetValues()
      toast({
        title: 'Postulación eliminada',
        duration: 4000,
        description: 'La postulación ha sido eliminada exitosamente',
      })
    }
  
  })
  const handleDelete = async () => {
    await execute({ postulationId: postulation.postulationId })
  }
  return (
    <Card className='flex shadow-sm border-2'>
      <div className='p-4 flex items-center justify-center'>
        <Image src="https://github.com/shadcn.png" alt="Postulaciones" width={80} height={80} />
      </div>
      <div className='w-full'>
        <CardHeader className='p-4 space-y-0'>
          <div className='flex justify-between'>
            <Link href={`/e/postulations/${postulation.id}`} className='inline hover:underline'>
              <CardTitle className='inline'>{postulation.title}</CardTitle>
            </Link>
            <ConfirmDialog
              onConfirm={handleDelete}
              alertTitle='¿Deseas eliminar esta postulación?'
              alertDescription={`Estas a punto de eliminar tu postulacion en "${postulation.title}". Esta acción no se puede deshacer. ¿Deseas continuar?`}
              asChild
            >
              <Button
                className='flex items-center justify-center'
                variant='ghost'
                size='xs'
              >
                <X className='w-4 h-4' />
              </Button>
            </ConfirmDialog>
          </div>
          <CardDescription>{postulation.business.name}</CardDescription>
          <p className='text-sm text-muted-foreground'>{postulation.business.province}</p>
          <p className='text-sm text-muted-foreground'>Modalidad: {postulation.modality}</p>
          <p className='text-xs text-muted-foreground'>{formatDistanceEs(postulation.createdAt)}</p>
        </CardHeader>
      </div>
    </Card>
  )
}

export default PostulationCard