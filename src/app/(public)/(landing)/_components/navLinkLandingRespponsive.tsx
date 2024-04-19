import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  GraduationCapIcon,
  BriefcaseBusiness,
  Building2,
} from 'lucide-react';

const links = [
  { name: 'Estudiantes', href: '/', icon: GraduationCapIcon },
  { name: 'Comisión', href: '/commission', icon: BriefcaseBusiness },
  { name: 'Empresas', href: '/company', icon: Building2 }
];

interface NavLinkResponsiveProps {
  closePanel: () => void;
}

function NavLinkResponsive({ closePanel }: NavLinkResponsiveProps) {
  const phatname = usePathname();
  return (
    <nav className='flex flex-col w-min mx-auto gap-6'>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-row gap-3 text-black hover:text-primary ${phatname === link.href ? 'text-primary' : ''}`}
            onClick={closePanel} // Aquí cerramos el panel al hacer clic en el enlace
          >
            <Icon className="" size={24} />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavLinkResponsive;
