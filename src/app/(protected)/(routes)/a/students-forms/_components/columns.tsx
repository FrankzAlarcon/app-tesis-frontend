"use client"

import { Button } from "@/components/ui/button"
import { StudentFormStatus } from "@/enums/student-forms.enum"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

export type StudentForm = {
  id: string
  studentName: string
  formId: string
  formCode: string
  status: StudentFormStatus
  onDownload: (id: string, status: StudentFormStatus) => void
}

export const columns: ColumnDef<StudentForm>[] = [
  {
    accessorKey: "studentName",
    header: "Estudiante",
  },
  {
    accessorKey: "formCode",
    header: "Formulario",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <span
          className={cn('px-2 py-1 cursor-default rounded-lg text-xs font-semibold',
            status === StudentFormStatus.EMITIDO && 'bg-yellow-500/80 text-white',
            status === StudentFormStatus.PENDIENTE && 'bg-blue-400 text-white',
            status === StudentFormStatus.APROBADO && 'bg-green-400 text-white',
            status === StudentFormStatus.RECHAZADO && 'bg-red-400 text-white',
          )}
        >
          {status}
        </span>
      )
    },

  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const formId = row.original.id
      const status = row.original.status
      return (
        <div className="flex justify-center">
          <Button
            size='sm' variant='outline'
            className="border-none cursor-pointer hover:underline"
            onClick={() => row.original.onDownload(formId, status)}
          >
            <span>Descargar</span>
          </Button>
        </div>
      )
    }
  },
]