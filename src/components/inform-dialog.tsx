import React, { ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'

interface InformDialogProps {
  children: ReactNode
  alertTitle: string
  alertDescription: string
  alertConfirmText?: string
  onConfirm: () => void
  asChild?: boolean
  className?: string
}

const InformDialog = ({
  children,
  alertTitle,
  alertDescription,
  alertConfirmText,
  className,
  onConfirm,
  asChild = false
}: InformDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild} className={className}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>{alertConfirmText ? alertConfirmText : 'Continuar'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InformDialog