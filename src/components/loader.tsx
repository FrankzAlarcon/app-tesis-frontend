import { cn } from '@/lib/utils'
import { Loader as LoaderIcon } from 'lucide-react'

const Loader = ({className}: {className?: string}) => {
  return (
    <LoaderIcon className={cn(
      "h-7 w-7 animate-spin text-primary",
      className
    )} />
  )
}

export default Loader