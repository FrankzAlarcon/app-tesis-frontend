import { signOut } from '@/actions/signout'
import React from 'react'

const StudentPage = () => {
  return (
    <div>
      <form action={async () => {
        "use server"
        await signOut()
      }}>
        <button type='submit'>Cerrar sesión</button>
      </form>
    </div>
  )
}

export default StudentPage