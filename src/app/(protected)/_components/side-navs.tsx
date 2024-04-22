'use client'
import React, { useState } from 'react';
import NavLinks from './nav-links';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { signOut } from '@/actions/signout';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (e: any) => {
    await signOut()
  }

  return (
    <div className="h-full w-full relative">
      {/* Botón flotante para abrir/cerrar el menú */}
      <button
        onClick={toggleMenu}
        className="absolute top-0 -right-9 m-4 p-2 h-9 w-9 flex items-center justify-center rounded-xl bg-primary z-10"
      >
        {isOpen ? <ChevronLeft size={24} className="text-white" /> : <ChevronRight size={24} className="text-white" />}
      </button>

      {/* Contenido del menú */}
      <div className={`flex flex-col justify-between h-5/6 pt-10 ${isOpen ? 'w-[220px]' : 'w-[80px]'}`}>
        <NavLinks isOpen={isOpen} />
        <form onSubmit={onSubmit}>
          <button
            type='submit'
            className="flex w-full items-center justify-center gap-4 p-4 hover:text-primary ">
            <LogOut size={24} className='-scale-100' />
            { isOpen && <div className="hidden md:block">Cerrar sesión</div> }
          </button>
        </form>
      </div>
    </div>
  );
}

export default SideNav;
