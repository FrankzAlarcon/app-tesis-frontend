'use client';

import { useState } from "react";
import Image from "next/image";
import NavLinksLanding from "./navLinksLanding";
import MenuPanel from "./menu-panel";

import { Menu } from 'lucide-react'
import Link from "next/link";

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-3 py-1">
      <MenuPanel isOpen={menuOpen} onClose={closeMenu} />
      <div className="flex items-center py-2 md:w-1/3 ">
        <a href="/" rel="noreferrer">
          <Image
            src="/EPN_logo_big.png"
            alt="Logo de la Escuela Politécnica Nacional"
            width={100}
            height={70}
          />
        </a>
        <h1 className="ml-4 font-bold">BOLSA DE TRABAJO</h1>
      </div>
      <div className="flex flex-row gap-8">
        <NavLinksLanding />
        <div className=" hidden md:flex gap-2 lg:gap-6 py-[8px] border-l-detail border-l-[5px] px-[15px] lg:px-[30px] font-semibold text-base">
          <Link
            key='/register-type-selection'
            href='/register-type-selection'
            className=' flex flex-col justify-center items-center text-black duration-300 transition-colors hover:text-primary'
          >
            Registrarse
          </Link>
          <Link
            key='/login'
            href='/login'
            className='flex flex-col border-y-[5px] border-y-detail justify-center items-center  text-black duration-300 transition-colors hover:text-primary'
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
      <div className="flex items-center md:hidden text-primary">
        <Menu
          size={24}
          onClick={toggleMenu}
        />
      </div>

    </header>
  );
}

export default Header;
