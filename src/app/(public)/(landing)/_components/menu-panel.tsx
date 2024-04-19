import React from 'react';
import { ArrowLeft } from 'lucide-react';
import NavLinksLandingResponsive from './navLinkLandingRespponsive';

interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuPanel({ isOpen, onClose }: MenuPanelProps) {
  return (
    <div className={`fixed w-full h-screen inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className=" fixed p-4 z-50 w-full h-full bg-white ">
        <button onClick={onClose}>
          <ArrowLeft size={24} />
        </button>
        <div className='mt-4'>
          <p className="text-xs">Ingresa a tu cuenta y disfruta de los beneficios de la Bolsa de Trabajo de las FIS</p>
        </div>
        <div className="flex justify-center items-center py-4 gap-6 font-semibold ">
          <a
            key='/register'
            href='/register'
            className='flex flex-col justify-center items-center text-black hover:text-primary'
          >
            Registrarse
          </a>
          <a
            key='/login'
            href='/login'
            className='flex flex-col border-y-[5px] border-y-detail justify-center items-center  text-black hover:text-primary'
          >
            Iniciar Sesión
          </a>
        </div>
        <div className="">
          <div className="border-t-2 border-gray-200 py-4">
            <p className='text-base font-bold text-center mb-4'>Explorar</p>
            <NavLinksLandingResponsive
              closePanel={onClose}
            />
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}></div>
    </div>
  );
}

export default MenuPanel;

