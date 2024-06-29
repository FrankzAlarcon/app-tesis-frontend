import { getProfile } from '@/actions/students/get-profile'
import { Mail } from 'lucide-react'
import { updateImageProfile } from '@/actions/students/update-image-profile'
import Image from 'next/image'
import { getSkills } from '@/actions/students/get-skills'
import EditProfileForm from './_components/edit-profile-form'
import ProfileContextProvider from '@/contexts/profile-context-provider'
import CertificationGroup from './_components/certifications-group'
import ProjectsGroup from './_components/projects-group'
import AvatarComponent from '@/components/avatar'


// TODO: Endpoint for user profile
const ProfilePage = async () => {
  const profile = await getProfile()
  const skills = await getSkills()
  if (!profile || !skills) return (<div>Loading...</div>)
  const { id, email, name, projects, ...rest } = profile
  return (
    <ProfileContextProvider profile={profile}>
      <div className='pb-6'>
        <div className='relative w-full h-full'>
          <div className='w-full h-48 absolute top-0 left-0'>
            <Image src='/profile-background.png' className='w-full h-full' alt='Profile background' width={400} height={200} />
          </div>
          <div className='w-full px-4 relative top-32 lg:px-8 max-h-96 lg:max-h-72'>
            <div className='w-full bg-white rounded-lg shadow-md px-2 pb-2 lg:px-4 lg:pb-4 flex flex-col gap-2'>
              <div className='flex flex-col items-center md:items-start lg:flex-row lg:justify-between relative'>
                <div className='flex flex-col md:flex-row items-center relative '>
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
                    <p className='text-gray-700 text-sm'>{profile?.shortPresentation ?? 'Estudiante de ingenieria de software'} </p>
                  </div>
                </div>
                <div className='flex gap-4 items-center'>
                  <div className=' flex flex-row gap-2 pt-2 md:pt-4'>
                    <p className='font-bold pb-1'>Conéctate conmigo: </p>
                    <p className='text-sm text-gray-700 flex gap-1 items-center'><Mail className='h-4 w-4' /><span>{profile?.email}</span></p>
                  </div>
                  <div className='pt-2'>
                    <EditProfileForm completeProfile={rest} />
                  </div>
                </div>
              </div>
              {
                profile?.description && (
                  <div className='lg:pt-4'>
                    <p className='font-bold pb-1'>Acerca de mí:</p>
                    <p className='text-gray-700 text-sm'>{profile?.description}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className='mt-60 bg-white rounded-lg shadow-md mx-4 p-2 lg:mt-48 lg:py-4 lg:px-8 lg:mx-8'>
          <p className=' text-xl font-bold'>Información relevante</p>
          <ProjectsGroup projects={profile?.projects} skills={skills} />
        </div>
        <CertificationGroup certifications={profile?.certifications} />
      </div>
    </ProfileContextProvider>
  )
}

export default ProfilePage