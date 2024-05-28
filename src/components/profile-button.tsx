'use client'

import { useCurrentUser } from "@/hooks/use-current-user"
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

interface ProfileButtonProps {
  withLogout?: boolean
}

// TODO: add skeleton loader for name
const ProfileButton = ({
  withLogout = true
}: ProfileButtonProps) => {
  const user = useCurrentUser()
  const [open, setOpen] = useState(false)

  const onLogout = async () => {
    await signOut()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <div className='flex gap-2 items-center'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64'>
        <DropdownMenuLabel >Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setOpen(false)} className='hover:bg-muted'>
            <Link href='/e/profile' className='w-full h-full flex items-center gap-2'>
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(false)} className='hover:bg-muted'>
            <Link href='/e/settings' className='w-full h-full flex items-center gap-2'>
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