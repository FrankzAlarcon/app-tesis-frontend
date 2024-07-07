import React, { ReactNode } from 'react'
import Header from './_components/header'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

const CompaniesLayout = async ({
  children
}: {
  children: ReactNode
}) => {
  const user = await currentUser()
  if (!user || user.role === 'student') {
    redirect('/login')
  }
  return (
    <div className='min-h-screen bg-[#f2f2f2]'>
      <Header />
      <main className='bg-[#f2f2f2] pt-[207px] md:pt-[74.5px]'>
        {children}
      </main>
    </div>
  )
}

export default CompaniesLayout