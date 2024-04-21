'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  BarChart4,
  Building,
  FileBarChart2,

} from 'lucide-react'

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart4 },
  { name: 'Empresas', href: '/dashboard/companies', icon: Building },
  { name: 'Proyectos', href: '/dashboard/students', icon: FileBarChart2 }
]

interface NavLinksProps {
  isOpen: boolean
}

function NavLinks({ isOpen }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <nav className='flex flex-col gap-4'>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-row gap-3 border-l-2 border-white ml-4 p-4 items-center text-black hover:text-primary hover:border-l-2 hover:border-l-primary ${pathname === link.href ? 'text-primary border-l-2 border-l-primary' : ''}`}
          >
            <Icon className={`${pathname === link.href ? 'text-primary' : 'text-gray-400'}`} size={24} />
            {isOpen && link.name}
          </Link>
        );
      })}
    </nav>
  )
}

export default NavLinks