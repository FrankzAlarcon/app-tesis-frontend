'use client'

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import SideNav from "./side-navs"

interface AdminContainerProps {
  children: ReactNode
}

const AdminContainer = ({
  children
}: AdminContainerProps) => {
  const pathname = usePathname()
  if (pathname.includes('/a/profile/b/') || pathname.includes('/a/profile/e/')){
    return (
      <>
        <div className="dashboard-screen flex justify-center items-center">
          {children}
        </div>
      </>
    );
  }
  return (
    <>
      <aside className="h-full border-r-2" >
          <SideNav />
        </aside>
        <div className="dashboard-screen flex justify-center items-center">
          {children}
        </div>
    </>
  )
}

export default AdminContainer