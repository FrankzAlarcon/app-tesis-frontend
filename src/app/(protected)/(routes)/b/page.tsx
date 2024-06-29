import { getProfile } from '@/actions/business/get-profile'
// import { getSkills } from '@/actions/students/get-skills'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
// import CertificationGroup from './_components/certifications-group'
// import ProjectsGroup from './_components/projects-group'
import PublicationsGroup from './_components/publications-group'
import { getPublicationsMock } from '@/actions/business/get-publications'
import EditProfileForm from './_components/edit-profile-form'
import Link from 'next/link'
import AvatarComponent from '@/components/avatar'
import { updateImageProfile } from '@/actions/business/update-image-profile'


// TODO: Endpoint for user profile
const BusinessPage = async () => {
  const profile = await getProfile()
  if (!profile) {
    return null
  }
  
  const { publications, ...rest } = profile
  console.log(publications, rest)
  return (
    <div className='pb-6'>
      <div className='relative w-full h-full'>
        <div className='w-full h-48 absolute top-0 left-0'>
          <Image src='/kushkiFondo.jpg' className=' w-full h-full object-cover' alt='Profile background' width={400} height={200} />
        </div>
        <div className='w-full px-4 relative top-32 lg:px-8 max-h-96 lg:max-h-72'>
          <div className='w-full bg-white rounded-lg shadow-md px-2 pb-2 lg:px-4 lg:pb-4 flex flex-col gap-2'>
            <div className='flex flex-col items-center md:items-start lg:flex-row lg:justify-between relative'>
              <div className='flex flex-col md:flex-row items-center relative md:items-start'>
                <div className='relative w-24 h-12 md:w-32 md:h-16'>
                  <AvatarComponent
                    src={profile?.imageUrl}
                    className='mx-auto -top-14 w-24 h-24 z-10 absolute md:w-32 md:h-32'
                    withEdit
                    action={updateImageProfile}
                  />
                </div>
                <div className='pt-2 md:pl-4'>
                  <p className='text-3xl font-bold text-center md:text-left'>{profile?.name}</p>
                  <p className='text-gray-700 text-sm'>{profile?.shortPresentation ?? 'Empresa'} </p>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='pt-2'>
                  <EditProfileForm completeProfile={rest} />
                </div>
              </div>
            </div>
            {
              profile?.description && (
                <div className=' p-3 lg:p-4'>
                  <p className='font-bold pb-1'>Acerca de nosotros: </p>
                  <p className='text-gray-700 text-sm'>{profile?.description}</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className='mt-40 bg-white relative rounded-lg shadow-md mx-4 p-2 lg:mt-36 lg:py-4 lg:px-8 lg:mx-8'>
        <div className='flex justify-between items-center'>
          <p className=' text-xl font-bold'>Publicaciones</p>
          <Link href="/b/publications/new"
            className="py-2 px-4 text-primary border border-primary bg-background hover:bg-blue-700 hover:text-white rounded-md transition duration-300 ease-in-out"
          >
            Crear publicación
          </Link>
        </div>
        {/* <ProjectsGroup projects={profile?.projects} skills={skills} /> */}
        <PublicationsGroup publications={publications} />
        <div className='pt-4 flex justify-center text-gray-500'>
          <Link href="/b/publications" className='flex gap-2 items-center hover:underline'>
            Ver todas las publicaciones <ArrowRight className='h-5 w-5' />
          </Link>
        </div>
      </div>
    </div>

  )
}

export default BusinessPage