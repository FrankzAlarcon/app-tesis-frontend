import { auth, signOut } from '@/auth'
import React from 'react'

const DashboardPage = async () => {
  // auth().then(res => console.log("SC - DASHBOARD PAGE", res))
  const session = await auth()

  return (
    <div className='w-full'>
      Pagina protegida del dashboard <br />
      <div className='w-4/5'>{JSON.stringify(session).replaceAll(",", ",\n")}</div>
    </div>
  )
}

export default DashboardPage