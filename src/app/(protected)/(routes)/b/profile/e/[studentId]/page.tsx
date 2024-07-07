import { getPublicStudentProfile } from '@/actions/shared/get-public-student-profile'
import ProfilePage from '@/app/(protected)/(routes)/e/profile/page'
import NotFoundPage from '@/app/not-found'
import React from 'react'

interface PublicProfilePageProps {
  params: {
    studentId: string
  }
}

const PublicStudentProfilePage = async ({
  params
}: PublicProfilePageProps) => {
  const data = await getPublicStudentProfile(params.studentId)
  if (!data) {
    return (
      <NotFoundPage />
    )
  }

  const { profile: publicStudentProfile, isPublic } = data

  if (!publicStudentProfile) {
    return (
      <NotFoundPage />
    )
  }

  return <ProfilePage isPublic={isPublic} publicProfile={publicStudentProfile} />
}

export default PublicStudentProfilePage