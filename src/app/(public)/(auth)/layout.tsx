import Image from 'next/image';
import AuthHeader from './_components/auth-header';
import BackArrowBotton from './_components/back-arrow-botton';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden">
      <AuthHeader />
      <div className='flex flex-col-reverse lg:flex-row h-full'>
        <aside className="hidden lg:block overflow-hidden md:w-2/5 ">
          <Image
            src="/img-auth.jpg"
            alt="Hero image"
            className=''
            width={900}
            height={400}
          />
        </aside>
        <div className="h-full lg:w-3/5 relative">
          <BackArrowBotton />
          {children}
        </div>
      </div>
    </div>
  );
}
