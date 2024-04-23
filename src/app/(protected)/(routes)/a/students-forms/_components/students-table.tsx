import React from 'react'

import { StudentForm, columns } from "./columns"
import { DataTable } from '../../_components/data-table'



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
  {
    id: "3",
    studentName: "Ana Maria Rodriguez Diaz",
    formId: "201921_FCP_002B",
    status: "processing",
    actions: "download",
  },
  {
    id: "4",
    studentName: "Juan Carlos Gomez Perez",
    formId: "201921_FCP_003C",
    status: "processing",
    actions: "download",
  },
  {
    id: "5",
    studentName: "Laura Andrea Sanchez Lopez",
    formId: "201921_FCP_004D",
    status: "approved",
    actions: "download",
  },
  {
    id: "6",
    studentName: "Diego Alejandro Martinez Ramirez",
    formId: "201921_FCP_005E",
    status: "approved",
    actions: "download",
  },
  {
    id: "7",
    studentName: "Valeria Sofia Garcia Herrera",
    formId: "201921_FCP_006F",
    status: "approved",
    actions: "download",
  },
  {
    id: "8",
    studentName: "Santiago Esteban Torres Castro",
    formId: "201921_FCP_007G",
    status: "approved",
    actions: "download",
  },
  {
    id: "9",
    studentName: "Camila Alejandra Ramirez Rios",
    formId: "201921_FCP_008H",
    status: "approved",
    actions: "download",
  },
  {
    id: "10",
    studentName: "Mateo David Hernandez Gutierrez",
    formId: "201921_FCP_009I",
    status: "approved",
    actions: "download",
  },
  {
    id: "11",
    studentName: "Isabella Sofia Chavez Mendoza",
    formId: "201921_FCP_010J",
    status: "processing",
    actions: "download",
  },
  {
    id: "12",
    studentName: "Eduardo Jose Vargas Navarro",
    formId: "201921_FCP_011K",
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