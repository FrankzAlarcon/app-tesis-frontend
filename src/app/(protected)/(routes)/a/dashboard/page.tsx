
import React from 'react'
import AgreementPieChart from './_components/agreement-pie-chart'
import AgreementCompanyBarChart from './_components/agreement-companie-bar-chart'
import { Activity } from 'lucide-react'
import ActivitiesPieChart from './_components/activities-cpp'
import { Button } from '@/components/ui/button'



const DashboardPage = async () => {

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
      <div className='flex flex-row justify-between'>
        <AgreementPieChart />
        <AgreementCompanyBarChart />
      </div>
      <div>
        <ActivitiesPieChart />
      </div>
    </section>
  )
}

export default DashboardPage