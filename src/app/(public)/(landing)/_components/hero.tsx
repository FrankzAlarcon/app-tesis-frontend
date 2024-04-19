import React from 'react'
import Image from 'next/image';

interface HeroProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

function Hero({ title, description, image }: HeroProps) {

  return (
    <article>
      <div className='w-full h-[250px] md:h-[290px] bg-tertiary py-4'>
        <div className='flex flex-col md:flex-row justify-center items-center w-4/5 lg:w-3/4 h-full mx-auto gap-4 lg:gap-0'>
          <div className='w-full md:w-2/3 lg:w-9/12 lg:px-10 flex flex-col gap-4 '>
            <h1 className='text-white text-xl lg:text-2xl font-bold'>{title}</h1>
            <p className='text-white text-sm lg:text-lg'>{description}</p>
          </div>
          <div className='lg:w-2/5 flex justify-center'>
            <Image
              src={image.src}
              alt={image.alt}
              width={250}
              height={250}
              className='hidden md:block'
            />
          </div>
        </div>
      </div>

    </article>
  )
}

export default Hero