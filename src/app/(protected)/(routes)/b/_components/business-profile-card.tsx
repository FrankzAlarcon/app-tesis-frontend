import AvatarComponent from '@/components/avatar'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

interface BusinessProfileCardProps {

}

const BusinessProfileCard = () => {
  return (
    <div className='w-full bg-white flex flex-col items-center pb-4 gap-2 shadow-md rounded-md'>
      <AvatarComponent src="https://github.com/shadcn.png"
        className='w-24 h-24 rounded-full shadow-md mt-4 mb-2'
      />
      <div className='space-y-2 flex flex-col items-center'>
        <p className='font-bold'>Nombre</p>
        <p className='text-gray-800 text-sm'>Description</p>
        <p className='text-gray-800 text-sm'>Ciudad - Pais</p>
      </div>
      <Link href="/b/profile"
        className={buttonVariants({ variant: 'outline', size: 'sm', className: 'border-primary text-primary' })}
      >
        Ver perfil
      </Link>
    </div >
  )
}

export default BusinessProfileCard