import { auth, signOut } from '@/auth'
import React from 'react'

const DashboardPage = async () => {
  // auth().then(res => console.log("SC - DASHBOARD PAGE", res))
  const session = await auth()

  return (
    <div>
      Pagina protegida del dashboard <br />
      <code>{JSON.stringify(session)}</code>
    </div>
  )
}

export default DashboardPage