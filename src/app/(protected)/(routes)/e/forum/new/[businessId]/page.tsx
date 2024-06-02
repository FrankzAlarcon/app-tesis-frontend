import { getShortBusinessInformation } from '@/actions/students/get-short-business-information'
import AvatarComponent from '@/components/avatar'
import TipTapEditor from '@/components/tip-tap-editor'
import React from 'react'
import NewForum from '../../_components/new-forum'
import { getForumByGroup } from '@/actions/students/get-forum-by-group'

interface CreateNewEntryProps {
  params: {
    businessId?: string // Hacer que businessId sea opcional
  }
}

const CreateForumEntryPage = async ({ params }: CreateNewEntryProps) => {
  console.log('CreateForumEntryPage', params)

  let shortBusinessInformation = null
  let allBusinesses = null

  if (params.businessId) {
    shortBusinessInformation = await getShortBusinessInformation(params.businessId)
  } else {
    const forum = await getForumByGroup()
    allBusinesses = forum?.data || []
  }

  return (
    <div className='min-h-[92vh] w-full flex items-start justify-center p-2 md:p-4 lg:px-8'>
      <div className='w-4/5 p-2 md:px-6 md:py-4 bg-white rounded-md shadow-md'>
        <div>
          <h1 className='text-primary text-2xl font-bold mb-2'>Publica una opinión</h1>
          <p className='text-xs text-gray-800'>Los estudiantes de la EPN podrán ver tu opinión acerca de tu experiencia trabajando con alguna empresa.</p>
          <p className='text-xs text-gray-800'>Recuerda ser respetuoso, tu opinión es valiosa para tus compañeros de la EPN</p>
        </div>
        <div>
          <p className='font-bold py-2'>Tu opinión será sobre:</p>
          <div className='flex items-center gap-2'>
            <AvatarComponent src="https://github.com/shadcn.png" />
            <p className='font-bold'>{shortBusinessInformation?.name}</p>
          </div>
        </div>
        <div className='py-4 p'>
          <NewForum businessId={params.businessId} />
        </div>
      </div>
    </div>
  )
}

export default CreateForumEntryPage
