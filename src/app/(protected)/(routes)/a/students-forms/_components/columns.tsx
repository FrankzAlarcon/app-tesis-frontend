"use client"

import { ColumnDef } from "@tanstack/react-table"

export type StudentForm = {
  id: string
  studentName: string
  formId: string
  status: "En proceso" | "Aprobado"
  actions: "Descargar"
}

export const columns: ColumnDef<StudentForm>[] = [
  {
    accessorKey: "studentName",
    header: "Estudiante",
  },
  {
    accessorKey: "formId",
    header: "Formulario",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <span
          className={`px-2 py-1 cursor-default rounded-lg text-xs font-semibold ${status === "En proceso"
            ? "bg-yellow-500/80 text-white"
            : "bg-green-400 text-white"
            }`}
        >
          {status}
        </span>
      )
    },

  },
  {
    accessorKey: "actions",
    header: "Acciones",
  },
]