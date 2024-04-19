import React from 'react'
import Image from 'next/image';

interface BusinessSectionProps {
  businessCards: {
    title: string;
    description: string;
    img: {
      src: string;
      alt: string;
    };
  }[];
}
function BusinessSection({ businessCards }: BusinessSectionProps) {
  return (
    <section className='bg-white py-4 px-8 lg:px-[120px] md:h-[450px] lg:h-[540px] flex flex-col gap-4 lg:gap-0 '>
      <article className='h-[190px] lg:h-[250px] flex lg:flex-row items-center justify-center md:gap-10 lg:gap-16'>
        <div className=''>
          <Image
            src={businessCards[0].img.src}
            alt={businessCards[0].img.alt}
            width={250}
            height={250}
            className='hidden lg:block'
          />
          <Image
            src={businessCards[0].img.src}
            alt={businessCards[0].img.alt}
            width={200}
            height={200}
            className='hidden md:block lg:hidden'
          />

        </div>
        <div className='md:w-3/5 lg:w-2/3'>
          <h3 className='text-tertiary text-xl lg:text-2xl font-bold mb-4'>{businessCards[0].title}</h3>
          <p className='text-secondary-foreground-foreground text-sm lg:text-lg'>{businessCards[0].description}</p>
        </div>
      </article>
      <article className='h-[190px] lg:h-[250px] flex lg:flex-row items-center justify-center md:gap-10 lg:gap-16 '>
        <div className='md:w-3/5 lg:w-2/3 '>
          <h3 className='text-tertiary text-xl lg:text-2xl font-bold mb-4'>{businessCards[1].title}</h3>
          <p className='text-secondary-foreground text-sm lg:text-lg'>{businessCards[1].description}</p>
        </div>
        <div className=''>
          <Image
            src={businessCards[1].img.src}
            alt={businessCards[1].img.alt}
            width={250}
            height={250}
            className='hidden lg:block'
          />

          <Image
            src={businessCards[1].img.src}
            alt={businessCards[1].img.alt}
            width={200}
            height={200}
            className='hidden md:block lg:hidden'
          />
        </div>
      </article>
    </section>
  )
}

export default BusinessSection