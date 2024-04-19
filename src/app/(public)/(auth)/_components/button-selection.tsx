import React from 'react'
import Link from 'next/link'

interface ButtonSelectionProps {
  title: string
  description: string
  link?: string
}
function ButtonSelection({ title, description, link }: ButtonSelectionProps) {
  return (
    <Link href={`${link}`}>
      <button
        className='md:w-[500px] h-[100px] rounded-xl  border border-slate-400 flex flex-col items-center justify-center px-6 hover:bg-accent hover:text-accent-foreground hover:border-primary'
      >
        <p className='font-semibold text-lg'>{title}</p>
        <p className='text-sm text-secondary-foreground'>{description}</p>
      </button>
    </Link>
  )
}

export default ButtonSelection