import React from 'react'
import { getPublicationEntryMock } from '@/actions/business/get-publication-entry'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceEs } from "@/lib/date-fns/format-distance-es"
import { Clock } from 'lucide-react'
import ApplicantsGroup from '../_components/applicantsGroup'
import NotFoundPage from '@/app/not-found'

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
  const publicationEntry = await getPublicationEntryMock(params.publicationId)
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
                <CardDescription>
                  <div className='flex flex-row justify-between w-full md:w-2/3'>
                    <p>
                      {publicationEntry.createdAt} - {formatDistanceEs(publicationEntry.createdAt)}
                    </p>
                    <div className='flex flex-row gap-1'>
                      <Clock size={16} />
                      <span className=''>{publicationEntry.entryTime} - {publicationEntry.departureTime}</span>
                    </div>
                  </div>
                </CardDescription>
                <CardDescription>{publicationEntry.location} ({publicationEntry.modality})</CardDescription>
              </CardHeader>
              <CardContent>
                <article className='w-full flex flex-col gap-4 md:gap-0 md:flex-row'>
                  <div className='w-full md:w-3/4'>
                    <p className='font-bold mb-2'>Habilidades requeridas:</p>
                    <div className='flex flex-row flex-wrap gap-2'>
                      {publicationEntry.skills.map(skill => (
                        <Badge
                          key={skill}
                          className="border px-4 rounded-full bg-blue-100 text-black"
                        >
                          {skill}
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
                  <p className='text-base'>{publicationEntry.description}</p>
                  <div>
                    <p className='font-bold'>Requisitos:</p>
                    <ul className='text-sm list-disc ml-6' >
                      {publicationEntry.requirements.map(req => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  {/* Calular duracion con fecha incio y fecha fin */}
                  <p><span className='font-bold'>Duración:</span> {publicationEntry.endDate} </p>
                  <div>
                    <p className='font-bold'>Beneficios para el estudiante:</p>
                    <ul className='text-sm list-disc ml-6'>
                      {publicationEntry.benefits.map(benefit => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Te recomendamos estos estudiantes</CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </div>
    </section >
  )
}

export default PublicationEntryPage