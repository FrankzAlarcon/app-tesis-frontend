import React, { ReactNode } from 'react'
import Header from './_components/header'

const StudentsLayout = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div className='min-h-screen'>
      <Header />
      <main className='bg-[#f2f2f2] pt-[207px] md:pt-[74.5px]'>
        {children}
      </main>
    </div>
  )
}

export default StudentsLayout