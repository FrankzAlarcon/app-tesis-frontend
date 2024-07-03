
import React from 'react'
import AgreementPieChart from './_components/agreement-pie-chart'
import AgreementCompanyBarChart from './_components/agreement-companie-bar-chart'
import { Activity } from 'lucide-react'
import ActivitiesPieChart from './_components/activities-cpp'



const DashboardPage = async () => {

  return (
    <section className='w-full h-full flex flex-col gap-6 py-10 px-10 overflow-x-auto'>
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