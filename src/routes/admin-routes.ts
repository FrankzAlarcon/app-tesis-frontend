import { Route } from "@/types/route";
import { BarChart4, Building, FileBarChart2 } from "lucide-react";

export const adminRoutes: Route[] = [
  {
    name: 'Dashboard',
    href: '/a/dashboard',
    Icon: BarChart4
  }, {
    name: 'Empresas',
    href: '/a/companies',
    Icon: Building
  }, {
    name: 'Estudiantes',
    href: '/a/students-forms',
    Icon: FileBarChart2
  }
]
