"use client"

import { Profile } from "@/types/student"
import { createContext, useCallback, useMemo, useState } from "react"

type UpdateProfile = Pick<Profile, 'shortPresentation' | 'description' | 'ira' | 'faculty'>

export interface ProfileContextValues {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  setProfileUpdated: (changes: UpdateProfile) => void
}

export const ProfileContext = createContext<ProfileContextValues | null>(null)

const ProfileContextProvider = ({
  profile: profileBase,
  children
}: {
  profile: Profile,
  children: React.ReactNode
}) => {
  const [profile, setProfile] = useState<Profile | null>(profileBase)

  const setProfileUpdated = useCallback((changes: UpdateProfile) => {
    if (!profile) return

    setProfile({
      ...profile,
      shortPresentation: changes.shortPresentation,
      description: changes.description,
      ira: changes.ira,
      faculty: changes.faculty
    })
  }, [profile])

  const values = useMemo(() => ({
    profile,
    setProfile,
    setProfileUpdated
  }), [profile, setProfile, setProfileUpdated])

  return (
    <ProfileContext.Provider value={values}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider