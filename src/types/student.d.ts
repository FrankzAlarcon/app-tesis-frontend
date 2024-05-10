export interface ProjectSkill {
  id: string
  name: string
}

export interface Project {
  id: string
  name: string
  description: string | null
  url: string | null
  studentId: string
  projectSkills: ProjectSkill[]
  certifications: any[]
}

export interface Profile {
  id: string
  name: string
  email: string
  shortPresentation: string | null
  description: string | null
  ira: string | null
  faculty: string | null
  projects: Project[]
}