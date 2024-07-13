import { getPublicBusinessProfile } from '@/actions/shared/get-public-business-profile'
import BusinessPage from '@/app/(protected)/(routes)/b/page'
import NotFoundPage from '@/app/not-found'
import React from 'react'

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