"use client"

import InformDialog from '@/components/inform-dialog'
import Loader from '@/components/loader'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { usePreview } from '@/hooks/use-preview'
import { BookX, ChevronsLeft, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { uploadEmittedForm } from '@/actions/students/upload-student-forms/emitted'

const ConfirmStep = () => {
  const { data, formId, formData, setData, setFormData } = usePreview()
  const { toast } = useToast()
  const informButton = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const { execute, isLoading } = useAction(uploadEmittedForm, {
    onError: (error) => {
      toast({
        title: error,
        description: 'Recarga la página e intenta de nuevo.',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      const link = document.createElement('a')
      link.href = `data:application/pdf;base64,${data}`
      link.download = `formulario-${formId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      informButton.current?.click()
    }
  
  })
  if (!data || data === '') {
    return (
      <div className='flex flex-col gap-2 justify-center items-center'>
        <BookX className='w-20 h-20 text-blue-700' />
        <p className='text-xl font-semibold text-blue-700 text-center'>No existe ningún formulario para mostrar.</p>
        <p className='text-sm '>Completa los pasos de un formulario para poder ver su preview</p>
        <Link href={`/e`}
          className={buttonVariants({ variant: 'default' })}
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  const handleReturnForm = () => {
    setFormData({})
    setData('')
    router.push(`/e/forms/${formId}`)
  }

  const handleSave = async () => {
    await execute({ formId, data, formData })
  }


  return (
    <div className='w-full space-y-4'>
      <div className='flex flex-col sm:flex-row gap-2 justify-between'>
        <Button className={buttonVariants({ variant: 'default' })}
          onClick={handleReturnForm}
        >
          <ChevronsLeft className='w-4 h-4 mr-2' />
          Regresar al formulario
        </Button>
        <Button className={buttonVariants({ variant: 'default', className: 'sm:w-[192px]'})}
          onClick={handleSave}
          disabled={isLoading}
        >
          {
            isLoading ? (
              <Loader className='text-white h-5 w-5' />
            ) : (
              <>
                <Download className='w-4 h-4 mr-2' />
                <span>Descargar y guardar</span>
              </>
            )
          }
        </Button>
      </div>
      <div>
        <object  className='w-full h-[70vh]' data={`data:application/pdf;base64,${data}`} type='application/pdf'></object>
      </div>
      <InformDialog
        asChild
        alertTitle='Tu formulario ha sido guardado!!'
        alertDescription='El siguiente paso es recolectar las firmas de tu Tutor y Responsable de la Entidad Receptora. Puedes ver el seguimiento de tu formulario desde tu perfil.'
        alertConfirmText='Entendido!'
        onConfirm={() => router.push(`/e/profile`)}
      >
        <Button ref={informButton} className={buttonVariants({ variant: 'default', className: 'hidden' })}>
          Volver al inicio
        </Button>
      </InformDialog>
    </div>
  )
}

export default ConfirmStep