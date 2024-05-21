import { ProfileContext, ProfileContextValues } from "@/contexts/profile-context-provider"
import { useContext } from "react"

export const useProfile = () => {
  return useContext(ProfileContext) as ProfileContextValues
}