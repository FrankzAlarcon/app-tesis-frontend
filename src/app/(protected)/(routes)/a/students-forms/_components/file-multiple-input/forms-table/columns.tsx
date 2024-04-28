import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type Form = {
  id: string;
  studentName: string;
  formId: string;
  status: "Aprobado" | "En proceso";
  onRemove: (index: number) => void;
};


export const columns: ColumnDef<Form>[] = [
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
      const status = row.original.status;
      return (
        <span
          className={`px-2 py-1 cursor-default rounded-lg text-xs font-semibold ${status === "En proceso"
            ? "bg-yellow-500/80 text-white"
            : "bg-green-400 text-white"
            }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const form = row.original.id;
      return (
        <button
          onClick={() => row.original.onRemove(parseInt(form))}
          className="text-red-500"
        >
          Eliminar
        </button>
      );
    },
  },
];
