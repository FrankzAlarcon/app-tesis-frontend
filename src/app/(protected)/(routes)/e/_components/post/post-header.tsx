import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceEs } from '@/lib/date-fns/format-distance-es'
import { formatDateComplete } from '@/lib/format-date'

interface PostHeaderProps {
  name: string
  createdAt: string
}

const PostHeader = ({
  name,
  createdAt
}: PostHeaderProps) => {
  return (
    <div className='flex gap-2 items-center'>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className=''>
        <p className='text-sm font-semibold'>{name}</p>
        <p className='text-xs text-gray-700'>{formatDistanceEs(createdAt)}</p>
      </div>
    </div>
  )
}

export default PostHeader