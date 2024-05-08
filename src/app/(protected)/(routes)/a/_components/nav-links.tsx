import { adminRoutes } from '@/routes/admin-routes'
import NavLink from '@/components/nav-link'

interface NavLinksProps {
  isOpen: boolean
}

function NavLinks({ isOpen }: NavLinksProps) {
  return (
    <nav className='flex flex-col gap-4'>
      {adminRoutes.map((link) => {
        return (
          <NavLink key={link.href} route={link} isOpen={isOpen} />
        );
      })}
    </nav>
  )
}

export default NavLinks