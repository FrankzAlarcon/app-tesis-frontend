import Image from 'next/image';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className='lg:flex h-full'>
        <aside className="hidden lg:block lg:w-1/2 ">
          <Image
            src="/img-auth.jpg"
            alt="Hero image"
            className='w-full h-full'
            width={450}
            height={400}
          />
        </aside>
        <div className="h-full lg:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
