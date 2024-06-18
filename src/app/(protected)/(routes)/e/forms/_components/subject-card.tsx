"use client"

import { cn } from "@/lib/utils"
import { Subject } from "@/types/subjects"

interface SubjectCardProps {
  subject: Subject
  selectedSubjects: string[]
  handleSelectSubject: (value: string) => void
}

const SubjectCard = ({
  subject,
  selectedSubjects,
  handleSelectSubject,
}: SubjectCardProps) => {
  return (
    <div role="button"
      onClick={() => handleSelectSubject(subject.id)}
      className={cn(
        "border shadow-sm hover:shadow-md hover:cursor-pointer transition-all duration-300 hover:bg-gray-50 flex flex-col justify-between",
        selectedSubjects?.includes(subject.id) ? "border-primary border-2 shadow-md shadow-blue-500" : "border-gray-200"
      )}
    >
      <div className="p-2 h-full flex justify-center items-center">
        <p className="text-center">{subject.name}</p>
      </div>
      <div className="bg-primary text-white text-center font-bold">
        <p>{subject.code}</p>
      </div>
    </div>
  )
}

export default SubjectCard