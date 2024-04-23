import React from 'react'

import { StudentForm, columns } from "./columns"
import { DataTable } from '../../../_components/data-table'


const data: StudentForm[] = [
  {
    id: "1",
    studentName: "Frankz Lenin Alarcón Cando",
    formId: "COD_EST_F_AA_119",
    status: "processing",
    actions: "download",
  },
  {
    id: "2",
    studentName: "Mario Jose Villamar Cahueñas",
    formId: "201921_FCP_001A",
    status: "approved",
    actions: "download",
  },
]

function StudentsTable() {
  return (
    <DataTable columns={columns} data={data} />
  )
}

export default StudentsTable  