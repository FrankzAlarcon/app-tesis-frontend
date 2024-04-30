import React from 'react'

import { Company, columns } from './columns'
import { DataTable } from '../../../_components/data-table'

const data: Company[] = [
  {
    id: '1',
    name: 'Kruger Corp',
    code: 'PVI-DICC-2022-02',
    agreement: 'Vinculación',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  },
  {
    id: '2',
    name: 'Megadatos',
    code: 'COD-002',
    agreement: 'Sin convenio',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  },
  {
    id: '3',
    name: 'Olade',
    code: 'COD-003',
    agreement: 'Laboral',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  },
  {
    id: '4',
    name: 'Empresa 4',
    code: 'COD-004',
    agreement: 'Laboral',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  },
  {
    id: '5',
    name: 'Empresa 5',
    code: 'COD-005',
    agreement: 'Sin convenio',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  },
  {
    id: '6',
    name: 'Empresa 6',
    code: 'COD-006',
    agreement: 'Laboral',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  },
  {
    id: '7',
    name: 'Empresa 7',
    code: 'COD-007',
    agreement: 'Laboral',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  },
  {
    id: '8',
    name: 'Empresa 8',
    code: 'COD-008',
    agreement: 'Vinculación',
    onRemove: (index: number) => console.log('Removing company', index),
    onAdd: (index: number) => console.log('Adding company', index)
  }
]

function CompaniesTable() {
  return (
    <DataTable columns={columns} data={data} pageSize={7} />
  )
}

export default CompaniesTable;
