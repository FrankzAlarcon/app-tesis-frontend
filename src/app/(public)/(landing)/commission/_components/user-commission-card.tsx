import React from 'react'
import Image from 'next/image';
import { Building, Phone, Mail } from 'lucide-react';

interface UserCommissionCardProps {
  name: string;
  position: string;
  description: string;
  officeNumber: string;
  extNumber: string;
  urlLinkedin: string;
  email: string;
  img: {
    src: string;
    alt: string;
  };


}
function UserCommissionCard({ name, position, description, officeNumber, extNumber, urlLinkedin, email, img }: UserCommissionCardProps) {
  return (
    <article className='h-[380px] w-[400px] bg-white shadow-md rounded-sm flex flex-col justify-center gap-6 p-4'>
      <div className='flex flex-col items-center '>
        <div className='relative w-24 h-24 rounded-full bg-[#6B7280] flex justify-center items-center'>
          <div className='w-20 h-20 rounded-full' >
            <img src={img.src} alt={img.alt} />
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-center text-detail font-bold text-lg'>{name}</p>
          <p className='text-center text-black font-bold text-base'>{position}</p>
        </div>
      </div>
      <p className='text-tertiary text-sm text-center'>{description}</p>
      <nav className='flex flex-row justify-center items-center gap-10'>
        <a href={urlLinkedin} target='_blank' className='flex flex-col gap-1 hover:scale-110 transition-transform duration-300 ease-in-out'>
          <img src='/Linkedin-two.svg' alt='linkedin' className='w-8 h-8' />
        </a>
        <a href={`mailto:${email}`} className='flex flex-col gap-1 hover:scale-110 transition-transform duration-300 ease-in-out'>
          <img src='/Mail.svg' alt='linkedin' className='w-10 h-10' />
        </a>
      </nav>
      <div className='flex flex-row px-4 justify-between'>
        <div className='flex flex-row items-center text-secondary-foreground gap-1'>
          <Building size={18} />
          <p className='font-bold text-xs'>Oficina: {officeNumber}</p>
        </div>
        <div className='flex flex-row items-center text-secondary-foreground gap-1'>
          <Phone size={18} />
          <p className='font-bold text-xs'>Ext: {extNumber}</p>
        </div>

      </div>


    </article>
  )
}

export default UserCommissionCard