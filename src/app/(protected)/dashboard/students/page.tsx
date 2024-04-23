import React from 'react'
import FilterSearch from '../_components/filter-search'
import StudentsTable from './_components/forms/students-table'


function StudentsPage() {
  return (
    <div className='w-11/12 h-5/6 dashboard-container-shadow p-4'>
      <p className='font-semibold text-base mb-2'>Formularios recibidos</p>
      <FilterSearch />
      <div className='mt-4'>
        <StudentsTable />
      </div>
    </div>
  )
}

export default StudentsPage