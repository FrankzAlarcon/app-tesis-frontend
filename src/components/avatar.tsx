import React from 'react'
import UploadImageProfileForm from './upload-image-profile-form'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
import { Camera } from 'lucide-react'

interface AvatarProps {
  src?: string | null
  name?: string
  className?: string,
  withEdit?: boolean
  action?: (prevState: any, data: FormData) => any
}

const AvatarComponent = ({
  src,
  name,
  className,
  withEdit = false,
  action
}: AvatarProps) => {
  return (
    <Avatar className={cn(
      className,
      withEdit && 'cursor-pointer relative group'
    )}>
      {
        withEdit && (
          <UploadImageProfileForm action={action as any}>
            <div className='hover:bg-black/10 border-white hover:border-2 bg-transparent rounded-full absolute top-0 z-10 left-0 w-full h-full flex justify-center items-center duration-200 transition-all'>
              <Camera className='w-10 h-10 stroke-white fill-black group-hover:opacity-100 opacity-0 duration-200 transition-all' />
            </div>
          </UploadImageProfileForm>
        )
      }
      <AvatarImage src={!!src ? src : undefined}  />
      <AvatarFallback>
        {!!name ? 
          name.substring(0,2).toUpperCase()
          : 'US'
        }
      </AvatarFallback>
    </Avatar>
  )
}

export default AvatarComponent