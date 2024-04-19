import React from 'react'
import { heroInfo, businessCards, valueInfo } from '@/landings-data/companies'
import { agreementsImages } from '@/landings-data/students'
import Hero from '../_components/hero'
import BusinessSection from '../_components/bussines-section'
import ValueSection from '../_components/value-section'
import AgreementSection from '../_components/agreements-section'

function CompanyPage() {
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
      <ValueSection
        title={valueInfo.title}
        description={valueInfo.description}
        image={valueInfo.img}
      />

      <AgreementSection
        title='Empresas que ya tienen convenio con nosotros'
        imgs={agreementsImages}
      />

    </main>

  )
}

export default CompanyPage