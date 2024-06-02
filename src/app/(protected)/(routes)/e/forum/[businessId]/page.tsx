import { getForumEntry } from '@/actions/students/get-forum-entry'
import Link from 'next/link'
import React from 'react'
import ForumEntry from '../_components/forum-entry'
import BusinessProfileCard from '../../../b/_components/business-profile-card'

interface ForumEntryPageProps {
  params: {
    businessId: string
  }
}

const ForumEntryPage = async ({
  params
}: ForumEntryPageProps) => {
  const forumEntries = await getForumEntry(params.businessId)
  if (!forumEntries) {
    return <div>Error</div>
  }
  return (
    <div className='min-h-[92vh] w-full flex items-start md:justify-center flex-col md:flex-row gap-4 p-2 md:p-4 lg:px-6'>
      <div className='w-full md:max-w-80'>
        <BusinessProfileCard />
      </div>
      <div className='bg-white w-full p-2 md:px-4'>
        <div className='flex justify-between items-center pb-2 md:pb-4'>
          <span className='text-3xl font-bold'>Opiniones</span>
          <Link href={`/e/forum/new/${params.businessId}`}
            className='bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out'
          >
            Publicar opinión
          </Link>
        </div>
        <div className='space-y-2'>
          {
            forumEntries.data.map((forumEntry) => (
              <ForumEntry key={forumEntry.id} forumEntry={forumEntry} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ForumEntryPage