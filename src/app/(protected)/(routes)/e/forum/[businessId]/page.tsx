import { getForumEntry } from '@/actions/students/get-forum-entry'
import Link from 'next/link'
import React from 'react'
import ForumEntry from '../_components/forum-entry'
import BusinessProfileCard from '../../../b/_components/business-profile-card'
import { buttonVariants } from '@/components/ui/button'
import { getPublications } from '@/actions/students/getPublications'
import ForumPublication from '../_components/forum-publication'

interface ForumEntryPageProps {
  params: {
    businessId: string
  }
}

const ForumEntryPage = async ({
  params
}: ForumEntryPageProps) => {
  const forumEntries = await getForumEntry(params.businessId)
  const publications = await getPublications(params.businessId)
  console.log(publications);
  if (!forumEntries) {
    return <div>Error</div>
  }
  return (
    <div className='h-forum lg:overflow-hidden w-full flex items-start md:justify-center flex-col md:flex-row gap-4 p-2 md:p-4 lg:px-6'>
      <div className='w-full md:w-[35%]'>
        <BusinessProfileCard />
      </div>
      <div className=' md:hidden w-full md:w-[40%] p-3 bg-white rounded-md'>
        <span className='text-sm font-bold'>Ultimas ofertas publicadas:</span>
        <div className='flex flex-col gap-2 mt-2'>
          {publications?.map((publication) => (
            <ForumPublication key={publication.id} shortPublication={publication} />
          ))}
        </div>
      </div >
      <div className='bg-white w-full h-full p-2 md:px-4 rounded-md'>
        <div className='flex justify-between items-center pb-2 md:pb-4'>
          <span className='text-2xl font-bold'>Opiniones</span>
          <Link href={`/e/forum/new/${params.businessId}`}
            className={buttonVariants({ variant: 'default' })}
          >
            Publicar opinión
          </Link>
        </div>
        <div className='space-y-2 h-full overflow-y-auto'>
          {
            forumEntries.data.map((forumEntry) => (
              <ForumEntry key={forumEntry.id} forumEntry={forumEntry} />
            ))
          }
        </div>
      </div>
      <div className=' hidden md:block h-auto w-full md:w-[45%] p-3 bg-white rounded-md'>
        <span className='text-sm font-bold'>Ultimas ofertas publicadas:</span>
        <div className='w-full flex flex-col gap-2 mt-2'>
          {publications?.map((publication) => (
            <ForumPublication key={publication.id} shortPublication={publication} />
          ))}
        </div>
      </div >
    </div>
  )
}

export default ForumEntryPage