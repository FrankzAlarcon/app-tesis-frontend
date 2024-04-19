import React from 'react'
import { usersInfo } from '@/landings-data/commission'
import UserCommissionCard from './user-commission-card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


function CommisionTeamSection() {
  return (
    <section className='bg-secondary h-[480px] py-4'>
      <p className='text-tertiary font-bold text-lg text-center mb-3'>Nuestro equipo de comisión</p>
      <div className='flex justify-center items-center'>
        <Carousel
          className='w-11/12 flex justify-center items-center '
        >

          <CarouselContent
            className='w-full mx-auto'>
            {usersInfo.map((user, index) => (
              <CarouselItem key={index}
                className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center items-center px-9 xl:px-4 mx-auto'
              >
                <UserCommissionCard
                  name={user.name}
                  position={user.position}
                  description={user.description}
                  officeNumber={user.officeNumber}
                  extNumber={user.extNumber}
                  urlLinkedin={user.urlLinkedin}
                  email={user.email}
                  img={user.img}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className='absolute translate-x-10 md:translate-x-6 lg:translate-x-4 xl:translate-x-2 bg-primary text-white'
          />
          <CarouselNext
            className='absolute -translate-x-10 md:-translate-x-6 lg:-translate-x-4 xl:-translate-x-2 bg-primary text-white'
          />

        </Carousel>
      </div>
    </section>
  )
}

export default CommisionTeamSection