import Image from "next/image";

import React from 'react'

function Footer() {
  return (
    <footer className="bg-tertiary p-4 md:h-36">
      <div className="z-10 w-full items-center justify-between flex flex-col gap-4 md:flex-row md:gap-0 ">
        <div className="flex items-center ">
          <a href="/" rel="noreferrer">
            <Image
              src="/logo-epn-web.svg"
              alt="Logo de la Escuela Politécnica Nacional"
              width={180}
              height={107}
            />
          </a>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm">
          <h3 className="text-white font-semibold">Conoce nuestros servicios:</h3>
          <a
            key='/'
            href='/'
            className='text-white hover:scale-105 transition-transform duration-300 ease-in-out'
          >
            Estudiantes
          </a>
          <a
            key='/commission'
            href='/commission'
            className='text-white hover:scale-105 transition-transform duration-300 ease-in-out'
          >
            Comisión
          </a>
          <a
            key='/company'
            href='/company'
            className='text-white hover:scale-105 transition-transform duration-300 ease-in-out'
          >
            Empresas
          </a>


        </div>
        <nav className="md:mr-6 flex flex-col gap-2 items-center justify-center">
          <h3 className="text-white text-sm font-semibold">Siguenos en nuestras redes:</h3>
          <ul className="flex flex-row gap-4" >
            <li>
              <a href="https://www.facebook.com/EPNQuito" target="_blank" rel="noreferrer">
                <Image
                  src="/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/EPNEcuador" target="_blank" rel="noreferrer">
                <Image
                  src="/x-twitter.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/epn_ecuador/" target="_blank" rel="noreferrer">
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/school/epnecuador/" target="_blank" rel="noreferrer">
                <Image
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer 