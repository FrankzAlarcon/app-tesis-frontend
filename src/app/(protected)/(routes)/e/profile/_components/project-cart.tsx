import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/types/student"
import { Disc } from "lucide-react"

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({
  project
}: ProjectCardProps) => {
  return (
    <Card className="">
      <CardHeader className="px-6 py-2">
        <CardTitle className="flex gap-1 items-center text-lg"><Disc className="h-3 w-3" />{project.name}</CardTitle>
        {project.description && (<CardDescription className="text-muted-foreground">{project.description}</CardDescription>)}
      </CardHeader>
      <CardContent className="pb-2">
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
      </CardContent>
    </Card>
  )
}

export default ProjectCard