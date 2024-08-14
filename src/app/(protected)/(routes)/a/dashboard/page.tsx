'use client'
import React from 'react'
import { Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DashboardCharts from './_components/charts'
import downloadDashboardReport from '@/actions/admin/download-report'

const DashboardPage = () => {

  return (
    <section className='w-full h-full flex flex-col gap-6 py-10 px-10 overflow-x-auto'>
      <div className='flex justify-end w-full'>
        <Button

          className=' p-2 border-none text-white '
        >
          <Activity className='w-5 h-5 mr-1' />
          <span>Generar reporte</span>
        </Button>
      </div>
      <DashboardCharts />
    </section >
  )
}

export default DashboardPage