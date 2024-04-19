import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ValueSectionProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  onClick?: () => void;
}

function ValueSection({ title, description, image, onClick }: ValueSectionProps) {
  return (
    <section className='bg-secondary h-[450px] md:h-[280px] lg:h-[350px] flex  justify-center items-center '>
      <article className='lg:w-4/5 md:h-4/6 lg:h-5/6 flex  items-center justify-center flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-16 '>
        <div>
          <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={300}
            className='hidden lg:block '
          />
          <Image
            src={image.src}
            alt={image.alt}
            width={250}
            height={250}
            className='block md:ml-8 lg:hidden lg:ml-0  '
          />
        </div>
        <div className='px-8 md:w-2/3'>
          <h3 className='text-tertiary text-xl lg:text-2xl font-bold mb-4'>{title}</h3>
          <p className='text-secondary-foreground text-sm lg:text-lg'>{description}</p>
          <div className='flex justify-center mt-4'>
            <Button
              variant={'outline'}
              className='bg-secondary border-2 text-secondary-foreground rounded-xl'
              onClick={onClick}
            >
              Conoce más
            </Button>
          </div>
        </div>
      </article>

    </section>
  )
}

export default ValueSection