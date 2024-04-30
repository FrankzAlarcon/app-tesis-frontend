import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type Company = {
  id: string;
  name: string;
  code: string;
  agreement: string;
  onRemove: (index: number) => void;
  onAdd: (index: number) => void;
};


export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Empresa",
  },
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "agreement",
    header: "Convenio",
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const company = row.original.id;
      const agreement = row.original.agreement;
      return (
        agreement !== "Sin convenio" ?
          <button
            onClick={() => row.original.onRemove(parseInt(company))}
            className="text-red-500"
          >
            Quitar convenio
          </button>
          :
          <button
            onClick={() => row.original.onAdd(parseInt(company))}
            className="text-green-500"
          >
            Agregar convenio
          </button>
      );
    },
  },
];

