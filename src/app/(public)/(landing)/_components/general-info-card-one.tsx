import React from 'react'
import Image from 'next/image';

interface GeneralInfoCardOneProps {
  title: string;
  description: {
    first: string;
    second: string;
    third: string;
  }
  img: {
    src: string;
    alt: string;
  };
}

function GeneralInfoCardOne({ title, description, img }: GeneralInfoCardOneProps) {
  return (
    <article className='flex lg:flex-row items-center justify-center md:gap-8 lg:gap-12 '>
      <div className='md:w-3/5 lg:w-2/3'>
        <h3 className='text-tertiary text-xl lg:text-2xl font-bold mb-4'>{title}</h3>
        <ul className='ml-4 lg:ml-6'>
          <li className='text-secondary-foreground-foreground text-sm lg:text-base list-disc'>{description.first}</li>
          <li className='text-secondary-foreground-foreground text-sm lg:text-base list-disc'>{description.second}</li>
          <li className='text-secondary-foreground-foreground text-sm lg:text-base list-disc'>{description.third}</li>
        </ul>
      </div>
      <div className=''>
        <Image
          src={img.src}
          alt={img.alt}
          width={250}
          height={250}
          className='hidden lg:block'
        />
        <Image
          src={img.src}
          alt={img.alt}
          width={190}
          height={190}
          className='hidden md:block lg:hidden'
        />
      </div>
    </article>
  )
}

export default GeneralInfoCardOne