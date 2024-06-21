import AvatarComponent from '@/components/avatar';
import Link from 'next/link';
import { ShortInformationCard } from '@/types/post';
import { formatDistanceEs } from '@/lib/date-fns/format-distance-es';

interface ForumPublicationProps {
  shortPublication: ShortInformationCard
}


const ForumPublication = ({ shortPublication }: ForumPublicationProps) => {
  return (
    <div className=" w-full border-2 p-2 rounded-lg">
      <div className='flex flex-row gap-2 w-full '>
        <div className=' w-[40%] flex flex-col items-center '>
          <AvatarComponent src="https://github.com/shadcn.png"
            className='w-14 h-14 rounded-full shadow-md mt-4 mb-2'
          />
          <p className='text-gray-500 text-xs text-center '>{formatDistanceEs(shortPublication.createdAt)}</p>
        </div>
        <div className='w-[60%] flex flex-col justify-between'>
          <div>
            <p className="text-sm font-bold mb-1">{shortPublication.title}</p>
            <p className="text-xs text-gray-600 font-semibold ">{shortPublication.business.name}</p>
            <p className="text-xs text-gray-600 ">
              <span>{shortPublication.business.province} </span>
              <span>({shortPublication.modality})</span>
            </p>
          </div>
          <div className='flex justify-end mt-2'>
            <Link
              href={`/e/postulations/${shortPublication.id}`}
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