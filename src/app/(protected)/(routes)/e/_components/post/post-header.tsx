import AvatarComponent from '@/components/avatar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceEs } from '@/lib/date-fns/format-distance-es'
import { formatDateComplete } from '@/lib/format-date'

interface PostHeaderProps {
  name: string
  image?: string | null
  createdAt: string
}

const PostHeader = ({
  name,
  image,
  createdAt
}: PostHeaderProps) => {
  return (
    <div className='flex gap-2 items-center'>
      <AvatarComponent
        src={image}
        name={name}
      />
      <div className=''>
        <p className='text-sm font-semibold'>{name}</p>
        <p className='text-xs text-gray-700'>{formatDistanceEs(createdAt)}</p>
      </div>
    </div>
  )
}

export default PostHeader