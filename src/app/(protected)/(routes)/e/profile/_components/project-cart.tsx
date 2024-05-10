import { Badge } from "@/components/ui/badge"
import { Project } from "@/types/student"
import { Disc } from "lucide-react"

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({
  project
}: ProjectCardProps) => {
  return (
    <div className="">
      <p className="flex gap-1 items-center font-bold"><Disc className="h-3 w-3" />{project.name}</p>
      <p className="text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        {
          project.projectSkills.map(skill => (
            <Badge
              key={skill.id}
              className="border border-black px-4 rounded-full bg-blue-100 text-black"
            >{skill.name}</Badge>
          ))
        }
      </div>
    </div>
  )
}

export default ProjectCard