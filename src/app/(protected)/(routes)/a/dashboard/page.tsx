import { auth, signOut } from '@/auth'
import React from 'react'

const DashboardPage = async () => {
  // auth().then(res => console.log("SC - DASHBOARD PAGE", res))
  const session = await auth()

  return (
    <div>
      <h1>Dashboard</h1>

    </div>
  )
}

export default DashboardPage