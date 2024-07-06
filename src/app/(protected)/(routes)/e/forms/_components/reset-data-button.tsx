"use client"

import { Button } from "@/components/ui/button"
import { LocalStorageKeys } from "@/enums/local-storage-keys"
import { Trash2 } from "lucide-react"
import { Step } from "../[formId]/steps/container-form"
import { useRouter } from "next/navigation"
import ConfirmDialog from "@/components/confirm-dialog"

interface ResetDataButtonProps {
  setStep: (step: Step) => void
}

const ResetDataButton = ({
  setStep
}: ResetDataButtonProps) => {
  const router = useRouter()
  const handleResetData = () => {
    const storageKeys = Object.values(LocalStorageKeys)
    storageKeys.forEach(key => {
      localStorage.removeItem(key)
    })
    setStep(1)
    router.refresh()
  }
  return (
    <ConfirmDialog asChild
      alertTitle="¿Estás seguro de vaciar el formulario?"
      alertDescription="Estás a punto de vaciar el formulario, si continúas perderás toda la información ingresada. ¿Deseas continuar?"
      onConfirm={handleResetData}      
    >
      <Button
        className='flex gap-1 items-center w-full sm:w-auto bg-red-600 hover:bg-red-500'
      >
        <Trash2 className='w-4 h-4' />
        <span>Vaciar fomulario</span>
      </Button>
    </ConfirmDialog>
  )
}

export default ResetDataButton