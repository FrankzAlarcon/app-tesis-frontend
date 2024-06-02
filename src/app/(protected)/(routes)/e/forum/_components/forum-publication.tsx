import AvatarComponent from '@/components/avatar';
import { ShortPostInformation } from '@/types/post'
import { calculateEntryDate } from '@/lib/format-date';
import React from 'react'
import Link from 'next/link';

interface ForumPublicationProps {
  shortPublication: ShortPostInformation
}


const ForumPublication = ({ shortPublication }: ForumPublicationProps) => {
  return (
    <div className=" w-full border-2 p-2 rounded-lg">
      <div className='flex flex-row gap-2 w-full '>
        <div className=' w-[40%] flex flex-col items-center '>
          <AvatarComponent src="https://github.com/shadcn.png"
            className='w-14 h-14 rounded-full shadow-md mt-4 mb-2'
          />
          <p className='text-gray-500 text-xs text-center '>{calculateEntryDate(shortPublication.createdAt)}</p>
        </div>
        <div className='w-[60%] flex flex-col justify-between'>
          <div>
            <p className="text-sm font-bold mb-1">{shortPublication.tittle}</p>
            <p className="text-xs text-gray-600 font-semibold ">{shortPublication.business.name}</p>
            <p className="text-xs text-gray-600 ">
              <span>{shortPublication.location} </span>
              <span>({shortPublication.modality})</span>
            </p>
          </div>
          <div className='flex justify-end mt-2'>
            <Link
              href={``}
              className="text-sm hover:underline text-primary"
            >
              Ver publicación
            </Link>
          </div>
        </div>

      </div>

    </div>

  )
}

export default ForumPublication