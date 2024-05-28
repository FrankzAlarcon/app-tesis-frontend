import { ProfileContext, ProfileContextValues } from "@/contexts/profile-context-provider"
import { useContext } from "react"

// TODO: Remove context if it's not used, remove useCurrentUser if it's not used
export const useProfile = () => {
  return useContext(ProfileContext) as ProfileContextValues
}