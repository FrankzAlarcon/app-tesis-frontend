import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GraduationCapIcon, BriefcaseBusiness, Building2 } from 'lucide-react';

const links = [
  { name: 'Estudiantes', href: '/', icon: GraduationCapIcon },
  { name: 'Comisión', href: '/commission', icon: BriefcaseBusiness },
  { name: 'Empresas', href: '/company', icon: Building2 }
];

function NavLinkResponsive() {
  const pathname = usePathname();
  return (
    <nav className='flex flex-row gap-3 lg:gap-6'>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`hidden md:flex flex-col justify-center items-center text-black duration-300 hover:text-primary ${pathname === link.href ? 'text-primary' : ''}`}
          >
            <Icon className=" w-5 h-5 lg:w-6 lg:h-6" /> {/* Ajustar tamaño de los iconos */}
            <span className="text-sm lg:text-base">{link.name}</span> {/* Ajustar tamaño del texto */}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavLinkResponsive;
