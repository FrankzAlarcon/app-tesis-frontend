import { getPublicBusinessProfile } from '@/actions/shared/get-public-business-profile'
import NotFoundPage from '@/app/not-found'
import React from 'react'
import BusinessPage from '../../page'

interface PublicProfilePageProps {
  params: {
    businessId: string
  }
}

const PublicBusinessProfilePage = async ({
  params
}: PublicProfilePageProps) => {
  const data = await getPublicBusinessProfile(params.businessId)
  if (!data) {
    return (
      <NotFoundPage />
    )
  }

  const { profile: publicBusinessProfile, isPublic } = data

  if (!publicBusinessProfile) {
    return (
      <NotFoundPage />
    )
  }

  return <BusinessPage isPublic={isPublic} publicProfile={publicBusinessProfile} />
}

export default PublicBusinessProfilePage