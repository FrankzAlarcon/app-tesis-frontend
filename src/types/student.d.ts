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
}

export interface Certification {
  id: string
  name: string
  description: string | null
  emissionDate: string
  url: string
  issuingBusiness: string
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
  certifications: Certification[]
}

export interface CompleteProfile {
  shortPresentation: string
  description: string
  faculty: string
  ira: string
}