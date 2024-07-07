import { getPublicStudentProfile } from '@/actions/shared/get-public-student-profile'
import NotFoundPage from '@/app/not-found'
import React from 'react'
import ProfilePage from '../page'

interface PublicProfilePageProps {
  params: {
    studentId: string
  }
}

const PublicProfilePage = async ({
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

export default PublicProfilePage