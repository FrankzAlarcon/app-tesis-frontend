import React from 'react'

import { Company, columns } from './columns'
import { DataTable } from '../../../_components/data-table'

interface CompaniesTableProps {
  data: Company[]
}


function CompaniesTable({ data }: CompaniesTableProps) {
  return (
    <DataTable columns={columns} data={data} pageSize={7} />
  )
}

export default CompaniesTable;
