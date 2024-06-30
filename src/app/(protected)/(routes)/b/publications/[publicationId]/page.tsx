import React from 'react'
import { getPublicationEntry } from '@/actions/business/get-publication-entry'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceEs } from "@/lib/date-fns/format-distance-es"
import { Clock } from 'lucide-react'
import ApplicantsGroup from '../_components/applicantsGroup'
import NotFoundPage from '@/app/not-found'
import { formatDateText } from '@/lib/format-date'
import SafeHTML from '@/components/safe-html'
import Image from 'next/image'

interface PublicationEntryPageProps {
  params: {
    publicationId?: string
  }
}

const PublicationEntryPage = async ({
  params
}: PublicationEntryPageProps) => {
  if (!params.publicationId) {
    return <div>Error</div>
  }
  const publicationEntry = await getPublicationEntry(params.publicationId)
  console.log(publicationEntry)
  if (!publicationEntry) {
    return <NotFoundPage />
  }
  return (
    <section className='p-6'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-3/5'>
            <Card>
              <CardHeader>
                <CardTitle>{publicationEntry.title}</CardTitle>
                <div className='text-sm'>
                  <div className='flex gap-8'>
                    <p>
                      {formatDateText(publicationEntry.createdAt)} - {formatDistanceEs(publicationEntry.createdAt)}
                    </p>
                    <div className='flex flex-row gap-1'>
                      <Clock size={16} />
                      <span className=''>{publicationEntry.entryTime} - {publicationEntry.departureTime}</span>
                    </div>
                  </div>
                </div>
                <div className='text-sm'>
                  {
                    (publicationEntry as any)?.location ? (
                      `${(publicationEntry as any).location} (${publicationEntry.modality})`
                    ) : (
                      <p>
                        <span className='font-bold'>Modalidad: </span>{publicationEntry.modality}
                      </p>
                    )
                  }
                </div>
              </CardHeader>
              <CardContent>
                <article className='w-full flex flex-col gap-4 md:gap-0 md:flex-row'>
                  <div className='w-full md:w-3/4'>
                    <p className='font-bold mb-2'>Habilidades requeridas:</p>
                    <div className='flex flex-row flex-wrap gap-2'>
                      {publicationEntry.skills.map(skill => (
                        <Badge
                          key={skill.publicationSkillId}
                          className="border px-4 rounded-full bg-blue-100 text-black"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className='w-full md:w-1/4'>
                    <p className='font-bold'>Remuneración: </p>
                    <p><span className='font-bold'>$ </span>{publicationEntry.remuneration}</p>
                  </div>
                </article>
                <h4 className='font-bold mt-4'>Acerca del trabajo:</h4>
                <div className='flex flex-col gap-2'>
                  <SafeHTML>{publicationEntry.description}</SafeHTML>
                  <div>
                    <p className='font-bold'>Requisitos:</p>
                    <SafeHTML>{publicationEntry.requirements}</SafeHTML>
                  </div>
                  {/* Calular duracion con fecha incio y fecha fin */}
                  {/* <p><span className='font-bold'>Duración:</span> {publicationEntry.endDate} </p> */}
                  <div>
                    <p className='font-bold'>Beneficios para el estudiante:</p>
                    <SafeHTML>{publicationEntry.benefits}</SafeHTML>
                  </div>
                </div>
                {
                  publicationEntry.imageUrl && (
                    <div className='flex items-center justify-center'>
                      <Image
                        src={publicationEntry.imageUrl}
                        alt={publicationEntry.title}
                        width={500}
                        height={300}
                      />
                    </div>
                  )
                }
              </CardContent>
            </Card>
          </div>
          <div className='w-full md:w-2/5'>
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Postulantes ({publicationEntry.postulations.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ApplicantsGroup applicants={publicationEntry.postulations} />
              </CardContent>
            </Card>
          </div>
        </div>
        {
          (publicationEntry as any).recommended?.length > 0 && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl'>Te recomendamos estos estudiantes</CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
              </Card>
            </div>
          )
        }
      </div>
    </section >
  )
}

export default PublicationEntryPage