import Header from "./_components/header";
import SideNav from "./_components/side-navs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className='flex flex-col-reverse lg:flex-row h-full'>
        <aside className="h-full border-r-2" >
          <SideNav />
        </aside>
        <div className="dashboard-screen flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
