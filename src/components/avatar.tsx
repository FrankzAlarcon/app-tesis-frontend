import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface AvatarProps {
  src: string
  className?: string
}

const AvatarComponent = ({
  src,
  className
}: AvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src}  />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default AvatarComponent