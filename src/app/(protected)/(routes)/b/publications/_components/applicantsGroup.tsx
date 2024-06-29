import React from 'react'
import { Postulation, ShortStudent } from '@/types/business'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceEs } from '@/lib/date-fns/format-distance-es'
import { FileText, SquareUserRound } from 'lucide-react'
import Link from 'next/link'
import Tooltip from '@/components/tooltip'

interface ApplicantCardProps {
  id: string
  status: string
  urlCV: string
  applicant: ShortStudent
  applicantDate: string
}


const ApplicantCard = ({
  id,
  status,
  urlCV,
  applicant,
  applicantDate,
}: ApplicantCardProps) => {
  return (
    <div className="flex flex-col border-b border-b-black   ">
      <div className='flex flex-col md:flex-row gap-2 md:items-center  '>
        <div className='flex flex-row gap-2 w-full md:w-2/5'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold">{applicant.name}</p>
            <p className="text-muted-foreground text-xs">{formatDistanceEs(applicantDate)}</p>
          </div>
        </div>

        <div className='flex flex-row justify-between w-3/5'>
          <div>
            <p className="text-sm font-bold">Contacto:</p>
            <p className="text-muted-foreground text-xs">{applicant.email}</p>
            {/* <p className="text-muted-foreground text-xs">{applicant.phone}</p> */}
          </div>
          <div className='flex flex-row gap-2'>
            <Tooltip tooltipContent='Ver currículum'>
              <Link
                href={urlCV}
                target="_blank"
                className="text-sm font-bold"
              >
                <FileText size={24}
                  className="text-muted-foreground"
                />
              </Link>
            </Tooltip>
            <Tooltip tooltipContent='Ver perfil'>
              <Link
                href={`/e/profile/${applicant.id}`}
              >
                <SquareUserRound size={24}
                  className="text-muted-foreground"
                />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div >
      <p
        className={`w-full mb-2 mt-1 text-xs text-center font-bold  ${status === 'Aceptado' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}
      >
        {status}
      </p>
    </div>
  )
}

interface ApplicantsGroupProps {
  applicants: Postulation[]
}

const ApplicantsGroup = ({
  applicants
}: ApplicantsGroupProps) => {
  return (
    <div className='flex flex-col gap-2 '>
      {applicants.length === 0 && (
        <div className='flex flex-col gap-2'>
          <p className='text-center text-muted-foreground'>No hay postulaciones</p>
        </div>
      )}
      {applicants.map(applicant => (
        <ApplicantCard
          key={applicant.id}
          id={applicant.id}
          status={applicant.status}
          urlCV={applicant.urlCV}
          applicant={applicant.student}
          applicantDate={applicant.createdAt}
        />
      ))}
    </div>
  )
}

export default ApplicantsGroup