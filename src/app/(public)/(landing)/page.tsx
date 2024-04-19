import Image from 'next/image'
import React from 'react'
import Hero from './_components/hero'
import { heroInfo, businessCards, valueInfo, agreementsImages } from '@/landings-data/students'
import BusinessSection from './_components/bussines-section'
import ValueSection from './_components/value-section'
import InfoSection from './_components/info-section'
import AgreementSection from './_components/agreements-section'

const StudentsLanding = () => {
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
      <InfoSection />
      <AgreementSection
        title='Convenios con empresas'
        imgs={agreementsImages}
      />

    </main>
  )
}

export default StudentsLanding