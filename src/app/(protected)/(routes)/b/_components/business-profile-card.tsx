import AvatarComponent from '@/components/avatar'
import Link from 'next/link'

interface BusinessProfileCardProps {

}

const BusinessProfileCard = () => {
  return (
    <div className='w-full bg-white flex flex-col items-center pb-4 gap-2 shadow-md rounded-md'>
      <AvatarComponent src="https://github.com/shadcn.png"
        className='w-24 h-24 rounded-full shadow-md mt-4 mb-2'
      />
      <div className='space-y-2'>
        <p className='font-bold'>Nombre</p>
        <p className='text-gray-800 text-sm'>Description</p>
        <p className='text-gray-800 text-sm'>Ciudad - Pais</p>
      </div>
      <Link href="/b/profile"
        className='bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out'
      >
        Ver perfil
      </Link>
    </div>
  )
}

export default BusinessProfileCard