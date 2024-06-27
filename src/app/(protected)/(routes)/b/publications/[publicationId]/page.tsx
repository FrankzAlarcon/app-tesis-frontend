import React from 'react'

const PublicationEntryPage = () => {
  return (
    <div className='p-2 pt-4 lg:p-8 grid gap-4 md:grid-cols-3 lg:gap-x-8 lg:gap-y-6'>
      <div className='bg-white rounded-lg shadow-md md:col-span-2 p-2'>Pasante</div>
      <div className='bg-white rounded-lg shadow-md md:col-span-1 p-2'>Postulantes</div>
      <div className='bg-white rounded-lg shadow-md md:col-span-3 p-2'>Recomendaciones</div>
    </div>
  )
}

export default PublicationEntryPage