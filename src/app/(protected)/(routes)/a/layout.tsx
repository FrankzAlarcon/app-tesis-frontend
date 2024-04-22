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
        <div className="h-full py-8 px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
