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
    <div className='h-forum w-full lg:overflow-hidden md:w-10/12 mx-auto flex items-start justify-center p-2 md:p-4 lg:px-8'>
      <div className='w-full p-2 bg-white rounded-md shadow-md'>
        <div>
          <h1 className='text-primary text-2xl font-bold mb-2'>Publica una opinión</h1>
          <p className='text-xs text-gray-800'>Los estudiantes de la EPN podrán ver tu opinión acerca de tu experiencia trabajando con alguna empresa.</p>
          <p className='text-xs text-gray-800'>Recuerda ser respetuoso, tu opinión es valiosa para tus compañeros de la EPN</p>
        </div>
        {shortBusinessInformation ? (
          <div>
            <p className='font-bold py-2'>Tu opinión será sobre:</p>
            <div className='flex items-center gap-2'>
              <AvatarComponent src="https://github.com/shadcn.png" />
              <p className='font-bold'>{shortBusinessInformation?.name}</p>
            </div>
          </div>
        ) : (
          <div>
            <p className='font-bold py-2'>Selecciona la empresa sobre la que quieres opinar:</p>
            {/* TODO:Implemtnar combo box con imagen */}
            <select className='w-full p-2 border border-gray-300 rounded-md'>
              {allBusinesses?.map(business => (
                <option key={business.businessId} value={business.businessId}>
                  {business.businessName}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className='py-4'>
          <NewForum />
        </div>
      </div>
    </div>
  )
}

export default CreateForumEntryPage
