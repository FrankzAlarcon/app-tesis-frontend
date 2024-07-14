import { StudentFormStatus } from "@/enums/student-forms.enum"

export interface StudentForm {
  id: string
  name: string
  description: string
  code: string
  createdAt: string
  updatedAt: string
}

export interface IStudentForm {
  id: string
  startDate: string
  pendingDate: string | null
  repprovalDate: string | null
  approvalDate: string | null
  status: StudentFormStatus
  url: string
  studentId: string
  formId: string
  createdAt: string
  updatedAt: string
  studentName: string
  formCode: string
}

export interface RegisteredForm {
  id: string
  startDate: string
  pendingDate: string | null
  repprovalDate: string | null
  approvalDate: string | null
  url: string
  studentId: string
  formId: string
  status: string
  createdAt: string
  updatedAt: string
}