import { redirect } from "next/navigation";
import Header from "./_components/header";
import SideNav from "./_components/side-navs";
import { currentUser } from "@/lib/auth";
import AdminContainer from "./_components/admin-container";



export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user || user.role === 'business' || user.role === 'student') {
    redirect('/login')
  }

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className='flex flex-col-reverse lg:flex-row h-full'>
        <AdminContainer>
          {children}
        </AdminContainer>
      </div>
    </div>
  );
}
