import { careerModalities } from "@/constants/career-modalities"
import { careers } from "@/constants/careers"
import { tipoInstitucionReceptora } from "@/constants/tipo-institucion-receptora"
import { tipoPractica } from "@/constants/tipo-practica"
import { z } from "zod"

const relacionConSchema = z.object({
  value: z.boolean(),
  codigo: z.string(),
  titulo: z.string(),
})
const businessDataSchema = z.object({
  razonSocial: z.string().min(1, 'Razon Social es requerida'),
  ruc: z.string().regex(/^[0-9]+$/, 'RUC debe ser un número').min(1, 'RUC es requerido'),
  email: z.string().email('Email no válido').min(1, 'Email es requerido'),
  ciudad: z.string().min(1, 'Ciudad es requerida'),
  direccion: z.string().min(1, 'Direccion es requerida'),
  telefono: z.string().min(1, 'Telefono es requerido'),
  celular: z.string().regex(/^[0-9]+$/, 'Celular debe ser un número').min(1, 'Celular es requerido'),
  tipoInstitucion: z.enum(tipoInstitucionReceptora.map(tipo => tipo.id) as any, {
    errorMap: (_issue, _ctx) => ({
      message: 'Seleccione un tipo de institución válido'
    })
  }),
  responsable: z.string().min(1, 'Responsable es requerido'),
})

const studentDataSchema = z.object({
  cedula: z.string().min(1, 'Cedula es requerido'),
  nombres: z.string().min(1, 'Nombre requerido'),
  creditos: z.string().regex(/^[0-9]+$/, 'Créditos debe ser un número').refine(value => !isNaN(Number(value)) && Number(value) <= 120, {
    message: 'Créditos debe ser un número y menor o igual a 120'
  })
})

const internshipDataSchema = z.object({
  tipoPractica: z.enum(tipoPractica.map(tipo => tipo.id) as any, {
    errorMap: (_issue, _ctx) => ({
      message: 'Seleccione un tipo de práctica válido'
    })
  }),
  campoAmplio: z.string().min(1, 'Campo Amplio es requerido'),
  campoEspecifico: z.string().min(1, 'Campo Específico es requerido'),
  tutorEpn: z.string().min(1, 'Tutor EPN es requerido'),
  relacionConConvenio: relacionConSchema.required(),
  relacionConInvestigacion: relacionConSchema.required(),
  relacionConVinculacion: relacionConSchema.required(),
})

const subjectsDataSchema = z.object({
  subjects: z.array(z.string().optional()).min(0),
  careerId: z.string(),
  additionalSubjects: z.string(),
})

const scheduleDataSchema = z.object({
  areaAsignada: z.string().min(1, 'Área Asignada es requerida'),
  incluirDiasNoTrabajados: z.boolean(),
  incluirHorasAlmuerzo: z.boolean(),
  horarioSemanal: z.object({
    total: z.string().regex(/^[0-9]+$/, 'Total debe ser un número').refine(value => !isNaN(Number(value)), {
      message: 'Total debe ser un número'
    }),
    inicio: z.string().datetime({
      message: 'Fecha de inicio no válida'
    }),
    fin: z.string().datetime({
      message: 'Fecha de fin no válida'
    }),
    horaAlmuerzo: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    }),
    lunes: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    }),
    martes: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    }),
    miercoles: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    }),
    jueves: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    }),
    viernes: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    }),
    sabado: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    }),
    domingo: z.object({
      inicio: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
      fin: z.string().refine((value) => {
        if (value === '') return true
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
      }),
    })
  }),
  fechasDiasNoTrabajados: z.array(z.object({
    id: z.string(),
    date: z.string().datetime(),
  })).min(0),
  observacionesAdicionales: z.string().optional(),
  horasTotales: z.string()
    .regex(/^[0-9]+$/, 'Horas Totales debe ser un número')
    .refine(value => !isNaN(Number(value)), {
      message: 'Horas Totales debe ser un número'
    }),
  pasantiasPagadas: z.object({
    value: z.boolean(),
    amount: z.string().optional()
  }),
})

const activitiesDataSchema = z.object({
  actividadesDesarrolladas: z.string().optional(),
  habilidadesAdquiridas: z.string().optional(),
  observacionesGenerales: z.string().optional(),
  seguimientoTutorAcademico: z.string(),
  evaluacionCualitativa: z.object({
    asistencia: z.string(),
    desempeno: z.string(),
    motivacion: z.string(),
    conocimientos: z.string(),
  })
})

const signatureDataSchema = z.object({
  tutor: z.object({
    name: z.string().min(1, 'Nombre es requerido'),
    ci: z.string().min(1, 'Cedula es requerida'),
  }),
  entidadReceptora: z.object({
    name: z.string().min(1, 'Nombre es requerido'),
    ci: z.string().min(1, 'Cedula es requerida'),
  }),
  comisionPracticas: z.object({
    name: z.string().min(1, 'Nombre es requerido'),
    ci: z.string().min(1, 'Cedula es requerida'),
  }),
  decano: z.object({
    name: z.string().min(1, 'Nombre es requerido'),
    ci: z.string().min(1, 'Cedula es requerida'),
  })
})

export const faa119FormSchema = z.object({
  career: z.enum(careers.map(career => career.id) as any, {
    errorMap: (_issue, _ctx) => ({
      message: 'Seleccione una carrera válida'
    })
  }),
  modality: z.enum(careerModalities.map(modality => modality.id) as any, {
    errorMap: (_issue, _ctx) => ({
      message: 'Seleccione una modalidad válida'
    })
  }),
  businessData: businessDataSchema,
  studentData: studentDataSchema,
  internshipData: internshipDataSchema,
  subjectsData: subjectsDataSchema,
  scheduleData: scheduleDataSchema,
  activitiesData: activitiesDataSchema,
  signatureData: signatureDataSchema,
})