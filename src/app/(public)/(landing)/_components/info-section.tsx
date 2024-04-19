
import React from 'react'
import { gerneralInfo } from '@/landings-data/students'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import GeneralInfoCardOne from './general-info-card-one'

function InfoSection() {
  return (
    <section className=' h-[370px] md:h-[280px] lg:h-[350px] bg-white p-4 w-full flex justify-center items-center'>
      <Carousel
        className=' hidden md:w-10/12 lg:w-11/12 h-full items-center justify-center md:flex'
        orientation='horizontal'
        opts={
          {

            loop: true,
          }
        }
      >
        <CarouselContent
          className='w-full'
        >
          <CarouselItem>
            <GeneralInfoCardOne
              title={gerneralInfo[0].title}
              description={gerneralInfo[0].description}
              img={gerneralInfo[0].img}
            />
          </CarouselItem>
          <CarouselItem>
            <h1>Por agregar info</h1>
          </CarouselItem>
          <CarouselItem>x2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          className='bg-primary text-white'
        />
        <CarouselNext
          className='bg-primary text-white'
        />
      </Carousel>

      <Carousel
        opts={
          {
            align: 'start',
            loop: true,
          }
        }
        orientation='vertical'
        className='md:hidden flex items-center justify-center '
      >
        <CarouselContent
          className='flex h-[270px]'
        >
          <CarouselItem
          >
            <GeneralInfoCardOne
              title={gerneralInfo[0].title}
              description={gerneralInfo[0].description}
              img={gerneralInfo[0].img}
            />
          </CarouselItem>
          <CarouselItem>
            <h1>Por agregar info</h1>
          </CarouselItem>
          <CarouselItem>
            <h1>Por agregar info</h1>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          className='bg-primary text-white'
        />
        <CarouselNext
          className='bg-primary text-white'
        />
      </Carousel>
    </section>
  )
}

export default InfoSection