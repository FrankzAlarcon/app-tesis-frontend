'use client'

import { cn } from '@/lib/utils'
import { Route } from '@/types/route'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLinkProps {
  isOpen?: boolean
  borderColorDirection?: 'left' | 'bottom'
  route: Route
}

const NavLink = ({
  route,
  borderColorDirection = 'left',
  isOpen = true
}: NavLinkProps) => {
  const pathname = usePathname()
  return (
    <Link
      href={route.href}
      className={cn(
        `w-full text-center flex gap-3 border-l-2 border-white ml-4 p-4 items-center text-black hover:text-primary duration-300`,
        pathname === route.href && borderColorDirection === 'left' && 'border-l-primary text-primary border-l-2',
        pathname === route.href && borderColorDirection === 'bottom' && 'border-b-primary text-primary border-b-2',
        borderColorDirection === 'left' && 'hover:border-l-2 hover:border-l-primary',
        borderColorDirection === 'bottom' && 'hover:border-b-2 hover:border-b-primary'
      )}
    >
      {route.Icon && <route.Icon className={`${pathname === route.href ? 'text-primary' : 'text-gray-400'}`} size={24} />}
      <p className={cn('text-center', !route.Icon && 'w-full')}>{isOpen && route.name}</p>
    </Link>
  )
}

export default NavLink