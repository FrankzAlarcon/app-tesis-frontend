import { getPublications } from '@/actions/business/get-publications'
import { redirect } from 'next/navigation'
import React from 'react'
import { PublicationCard } from '../_components/publications-group'
import Link from 'next/link'

const PublicationsPage = async () => {
  const publications = await getPublications()
  if (!publications) {
    redirect('/login')
  }
  console.log(publications)
  const { data } = publications

  return (
    <div className='p-2 pt-4 flex flex-col gap-4 md:flex-row w-full md:p-8 md:pt-12'>
      <div className='md:w-1/4'>

      </div>
      <div className='bg-white rounded-md shadow-md p-2 space-y-4 md:w-3/4 md:p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold pb-2'>Publicaciones</h1>
          <Link href="/b/publications/new"
            className="py-2 px-4 text-primary border border-primary bg-background hover:bg-blue-700 hover:text-white rounded-md transition duration-300 ease-in-out"
          >
            Crear publicación
          </Link>
        </div>
        <div>
          {
            data.length === 0 && (
              <div className='text-center text-gray-500'>
                <p>Aún no has creado pulicaciones!</p>
              </div>
            )
          }
          <div className='space-y-4 md:space-y-6'>
            {
              data.map(shortPublication => (
                <PublicationCard
                  key={shortPublication.id}
                  publication={shortPublication}
                  enableEdition
                  large
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicationsPage