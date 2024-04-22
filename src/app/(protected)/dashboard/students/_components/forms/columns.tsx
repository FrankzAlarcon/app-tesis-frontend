"use client"

import { ColumnDef } from "@tanstack/react-table"

export type StudentForm = {
  id: string
  studentName: string
  formId: string
  status: "processing" | "approved"
  actions: "download"
}

export const columns: ColumnDef<StudentForm>[] = [
  {
    accessorKey: "studentName",
    header: "Estudiante",
  },
  {
    accessorKey: "Formulario",
    header: "Form ID",
  },
  {
    accessorKey: "Estado",
    header: "Status",
  },
  {
    accessorKey: "Acciones",
    header: "Actions",
  },
]