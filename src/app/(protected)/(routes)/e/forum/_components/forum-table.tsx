"use client"

import AvatarComponent from '@/components/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ForumEntry } from '@/types/forum'
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { ArrowUpDown, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const calculateGrade = (avgGrade: number) => {
  // replace this to manage the grades in a better way, for example 4.5 should be 'Muy buena experiencia'
  if (avgGrade >= 4 && avgGrade <= 5) return 'Exelente experiencia'
  if (avgGrade >= 3 && avgGrade < 4) return 'Buena experiencia'
  if (avgGrade >= 2 && avgGrade < 3) return 'Experiencia regular'
  if (avgGrade >= 1 && avgGrade < 2) return 'Mala experiencia'
  if (avgGrade >= 0 && avgGrade < 1) return 'Muy mala experiencia'
  return 'Sin calificar'
}

interface ForumTableProps {
  forum: ForumEntry[]
}

const columns: ColumnDef<ForumEntry>[] = [
  {
    accessorKey: 'businessName',
    header: ({ column }) => (
      <Button variant="ghost" size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Empresa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row, }) => {
      return (
        <div className='flex items-center gap-1'>
          <AvatarComponent src="https://github.com/shadcn.png" />
          <div className='flex flex-col gap-2'>
            <span className='font-bold'>{row.getValue('businessName')}</span>
            <span className='text-sm text-gray-700'>{row.original.businessDescription}</span>
          </div>
        </div>
      )
    }
  }, {
    accessorKey: 'count',
    header: () => <div className="font-bold">Opiniones</div>,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className='font-bold'>{row.getValue('count')}</span>
        <span className='text-xs text-gray-700'>Opinión(es)</span>
      </div>
    )
  }, {
    accessorKey: 'avgGrade',
    header: () => <div className="font-bold">Calificación</div>,
    cell: ({ row }) => (
      <div className='flex flex-col gap-1'>
        <div className="flex gap-1 items-center">
          <span className='font-bold'>{row.getValue('avgGrade')}/5</span>
          <Star className='w-4 h-4 text-black fill-amber-400' />
        </div>
        <span className='text-xs text-gray-500'>{calculateGrade(row.getValue('avgGrade'))}</span>
      </div>
    )

  }
]

const ForumTable = ({
  forum
}: ForumTableProps) => {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const table = useReactTable({
    data: forum,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility
    }
  })

  const handleGoToForum = (id: string) => {
    router.push(`/e/forum/${id}`)
  }

  return (
    <div className='w-full'>
      <div className='py-2'>
        <Input
          placeholder='Filtrar empresas...'
          value={(table.getColumn('businessName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('businessName')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {
                    headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {
                          header.isPlaceholder ? null : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                      </TableHead>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    onClick={() => handleGoToForum(row.original.businessId)}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className='cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out'
                  >
                    {
                      row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='text-center'>
                    No hay datos
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      <div className="space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}

export default ForumTable