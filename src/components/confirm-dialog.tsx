"use client"

import { ReactNode } from 'react'
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

interface ConfirmDialogProps {
  children: ReactNode
  alertTitle: string
  alertDescription: string
  alertCancelText?: string
  alertConfirmText?: string
  onConfirm: () => void
  asChild?: boolean
  className?: string
}

const ConfirmDialog = ({
  children,
  alertTitle,
  alertDescription,
  alertCancelText,
  alertConfirmText,
  className,
  onConfirm,
  asChild = false
}: ConfirmDialogProps) => {
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
        {}
        <AlertDialogFooter>
          <AlertDialogCancel>{alertCancelText ? alertCancelText : 'Cancelar'}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{alertConfirmText ? alertConfirmText : 'Continuar'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog