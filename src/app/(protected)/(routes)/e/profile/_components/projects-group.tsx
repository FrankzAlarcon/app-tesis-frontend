"use client"

import { removeProject } from "@/actions/students/remove-project"
import ConfirmDialog from "@/components/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAction } from "@/hooks/use-action"
import { Project, ProjectSkill } from "@/types/student"
import { Disc, Pencil, X } from "lucide-react"
import { useState } from "react"
import NewProject from "./new-project"
import { Toggle } from "@/components/ui/toggle"

interface ProjectCardProps {
  project: Project
  enableEdition: boolean
}

const ProjectCard = ({
  project,
  enableEdition
}: ProjectCardProps) => {
  const { toast } = useToast()
  const { execute, resetValues } = useAction(removeProject, {
    onSuccess: () => {
      resetValues()
      toast({
        title: 'Proyecto eliminado',
        duration: 4000,
        description: 'El proyecto ha sido eliminado exitosamente',
      })
    }
  })

  const handleRemoveProject = async () => {
    await execute({ projectId: project.id })
  }

  return (
    <Card className="">
      <CardHeader className="w-full space-y-0 pr-6 py-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="flex gap-1 items-center text-lg"><Disc className="h-3 w-3" />{project.name}</CardTitle>
          {project.description && (<CardDescription className="text-muted-foreground">{project.description}</CardDescription>)}
        </div>
        {
          enableEdition && (
            <ConfirmDialog asChild 
              alertTitle={`¿Estás seguro que quieres eliminar el proyecto: ${project.name}?`}
              alertDescription="Esta acción no se puede deshacer."
              onConfirm={handleRemoveProject}
            >
              <Button variant='outline' className="w-6 h-6 p-0 border-none">
                <X className="h-6 w-6 text-gray-800" />
              </Button>
            </ConfirmDialog>
          )
        }
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

interface ProjectsGroupProps {
  projects: Project[]
  skills: ProjectSkill[]
}

const ProjectsGroup = ({
  projects = [],
  skills = []
}: ProjectsGroupProps) => {
  const [enableEditMode, setEnableEditMode] = useState(false)

  const handleEnableEdit = () => {
    setEnableEditMode(!enableEditMode)
  }
  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <p className='font-bold py-2'>Mis proyectos destacados:</p>
        <Toggle asChild>
          <Button aria-label="Habilitar edición" variant='ghost' onClick={() => handleEnableEdit()}>
            <Pencil className="w-5 h-5" />
          </Button>
        </Toggle>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        {
          projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              enableEdition={enableEditMode}
            />
          ))
        }
        <NewProject skills={skills} />
      </div>
    </div>
  )
}

export default ProjectsGroup