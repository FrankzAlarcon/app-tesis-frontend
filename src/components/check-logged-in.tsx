"use client"

import { signOut } from "@/actions/signout"
import axios from "axios"
import { Loader } from "lucide-react"
import { Session } from "next-auth"
import { ReactNode, useEffect, useState } from "react"

interface CheckIsLoggedInProps {
  children: ReactNode
}

const CheckIsLoggedIn = ({
  children
}: CheckIsLoggedInProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  useEffect(() => {
    axios.post('/api/current')
      .then(() => {
        setIsLoggedIn(true)
      })
      .catch(async () => {
        setIsLoggedIn(false)
      })

  }, [])
  return (
    <div>
      {isLoggedIn ? children : (
        <div className="w-min mx-auto pt-14">
          <Loader className="h-7 w-7 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}

export default CheckIsLoggedIn