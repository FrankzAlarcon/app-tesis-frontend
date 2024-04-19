'use client';

import React, { useEffect, useRef } from 'react'

interface AgreementSectionProps {
  title: string;
  imgs: {
    src: string;
    alt: string;
  }[];
}

function AgreementSection({ title, imgs }: AgreementSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   let currentOffset = 0;
  //   const interval = setInterval(() => {
  //     currentOffset -= 1; // Ajusta la velocidad del desplazamiento cambiando este valor
  //     if (container) {
  //       container.style.transform = `translateX(${currentOffset}px)`;
  //       if (currentOffset <= -container.offsetWidth) {
  //         currentOffset = 0;
  //       }
  //     }
  //   }, 20); // Ajusta el intervalo de tiempo para cambiar la velocidad de desplazamiento
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className='h-[240px] w-full bg-secondary py-2'>
      <p className='text-tertiary font-bold text-base text-center mb-3'>{title}</p>
      <div className=''>
        <article className='flex flex-col gap-4 w-full'>
          <div className='lg:h-[75px] carousel overflow-hidden bg-white py-2 '>
            <div className='h-full logos-slide inline-block logo-carousel-animation '>
              {imgs.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className='h-full object-cover inline-block mx-4'
                />
              ))}
              {imgs.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className='h-full object-cover inline-block mx-4'
                />
              ))}

            </div>
            <div className='h-full logos-slide inline-block logo-carousel-animation'>
              {imgs.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className='h-full object-cover inline-block mx-4'
                />
              ))}
              {imgs.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className='h-full object-cover inline-block mx-4'
                />
              ))}
            </div>
          </div>
          <div className='lg:h-[75px] carousel overflow-hidden bg-white py-2 '>
            <p className='text-center'>mas logos de empresas pero animacion a la izquierda </p>
          </div>
        </article>
      </div>

    </section>
  )
}

export default AgreementSection