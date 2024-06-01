import React from 'react'

interface CreateNewEntryProps {
  params: {
    businessId: string
  }
}

const CreateForumEntryPage = ({
  params
}: CreateNewEntryProps) => {
  console.log('CreateForumEntryPage', params)
  return (
    <div className='min-h-[92vh] w-full flex items-center justify-start p-2 md:p-4 lg:px-8'>
      crear nuevos
    </div>
  )
}

export default CreateForumEntryPage