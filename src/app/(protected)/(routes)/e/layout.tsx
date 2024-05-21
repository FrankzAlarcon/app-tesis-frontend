import React, { ReactNode } from 'react'
import Header from './_components/header'

const StudentsLayout = async ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div className='min-h-screen '>
      <Header />
      <main className='bg-gray-50'>
        {children}
      </main>
    </div>
  )
}

export default StudentsLayout