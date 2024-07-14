'use client'

import { ChevronDownIcon, LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "@/actions/signout"
import { Button } from "./ui/button"
import { useState } from "react"
import { User as UserType } from "next-auth"
import AvatarComponent from "./avatar"

interface ProfileButtonProps {
  user: UserType
  withLogout?: boolean
  role: string
}

// TODO: add skeleton loader for name
const ProfileButton = ({
  user,
  withLogout = true,
  role
}: ProfileButtonProps) => {
  const [open, setOpen] = useState(false)

  const onLogout = async () => {
    await signOut()
  }
  const profileLink = role === 'student' ? '/e/profile' : '/b/profile'
  const settingsLink = role === 'student' ? '/e/settings' : '/b/settings'

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <div className='flex gap-2 items-center'>
          <AvatarComponent
            src={user.image}
            name={user?.name as any}
          />
          <p>{user?.name}</p>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64'>
        <DropdownMenuLabel >Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setOpen(false)} className='hover:bg-muted'>
            <Link href={profileLink} className='w-full h-full flex items-center gap-2'>
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(false)} className='hover:bg-muted'>
            <Link href={settingsLink} className='w-full h-full flex items-center gap-2'>
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {
          withLogout && (
            <DropdownMenuGroup>
              <DropdownMenuItem className='hover:bg-muted' asChild>
                <Button variant='ghost' size='sm'
                  className="w-full flex font-normal items-center gap-2 justify-start hover:cursor-pointer hover:ring-0 focus:ring-0"
                  onClick={onLogout}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton