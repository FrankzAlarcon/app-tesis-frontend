import React from 'react'

import { Company, columns } from './columns'
import { DataTable } from '../../../_components/data-table'

interface CompaniesTableProps {
  data: Company[]
  handleNextPage: () => void
  handlePreviousPage: () => void
}


function CompaniesTable({ data }: CompaniesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pageSize={10}
    />
  )
}

export default CompaniesTable;
