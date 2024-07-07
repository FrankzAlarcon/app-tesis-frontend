import { create } from 'zustand'

type PreviewStorage = {
  formData: {[key in string]: any}
  formId: string
  data: string
  setData: (data: string) => void
  setFormId: (formId: string) => void
  setFormData: (formData: any) => void
}

export const usePreview = create<PreviewStorage>((set) => ({
  formData: {},
  formId: '',
  data: '',
  setData: (data) => set({ data }),
  setFormId: (formId) => set({ formId }),
  setFormData: (formData) => set({ formData })
}))