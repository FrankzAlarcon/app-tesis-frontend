import React from 'react'
import { heroInfo, businessCards } from '@/landings-data/commission'
import Hero from '../_components/hero'
import BusinessSection from '../_components/bussines-section'
import CommsionTeamSection from './_components/commision-team-section'

function CommissionPage() {
  return (
    <main className=''>
      <Hero
        title={heroInfo.title}
        description={heroInfo.description}
        image={heroInfo.img}
      />
      <BusinessSection
        businessCards={businessCards}
      />
      <CommsionTeamSection />

    </main>

  )
}

export default CommissionPage