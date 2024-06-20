import { tipoInstitucionReceptora } from "@/constants/tipo-institucion-receptora"
import { tipoPractica } from "@/constants/tipo-practica"
import { z } from "zod"

const relacionConSchema = z.object({
  value: z.boolean(),
  codigo: z.string(),
  titulo: z.string(),
})

export const businessDataSchema = z.object({
  razonSocial: z.string().min(1, 'Razon Social es requerido'),
  ciudad: z.string().min(1, 'Ciudad es requerido'),
  direccion: z.string().min(1, 'Direccion es requerido'),
  telefono: z.string().min(1, 'Telefono es requerido'),
  celular: z.string().regex(/^[0-9]+$/, 'Celular debe ser un número').min(1, 'Celular es requerido'),
  tipoInstitucion: z.enum(tipoInstitucionReceptora.map(tipo => tipo.id) as any, {
    required_error: 'Tipo de Institución es requerido'
  }),
  responsable: z.string().min(1, 'Responsable es requerido'),
  cedula: z.string().min(1, 'Cedula es requerido'),
  nombres: z.string().min(1, 'Nombres es requerido'),
  creditos: z.string().regex(/^[0-9]+$/, 'Créditos debe ser un número').refine(value => !isNaN(Number(value)) && Number(value) <= 120, {
    message: 'Créditos debe ser un número y menor o igual a 120'
  }),
  tipoPractica: z.enum(tipoPractica.map(tipo => tipo.id) as any, {
    required_error: 'Tipo de Práctica es requerido'
  }),
  campoAmplio: z.string().min(1, 'Campo Amplio es requerido'),
  campoEspecifico: z.string().min(1, 'Campo Específico es requerido'),
  tutorEpn: z.string().min(1, 'Tutor EPN es requerido'),
  relacionConConvenio: relacionConSchema,
  relacionConInvestigacion: relacionConSchema,
  relacionConVinculacion: relacionConSchema,
})

export const step2Schema = z.object({
  subjects: z.array(z.string().optional()).min(0),
  careerId: z.string(),
  additionalSubjects: z.string(),
})

export const step3Schema = z.object({
  incluirDiasNoTrabajados: z.boolean(),
  incluirHorasAlmuerzo: z.boolean(),
  horarioSemanal: z.object({
    total: z.string().regex(/^[0-9]+$/, 'Total debe ser un número').refine(value => !isNaN(Number(value)), {
      message: 'Total debe ser un número'
    }),
    inicio: z.date(),
    fin: z.date(),
    horaAlmuerzo: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    lunes: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    martes: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    miercoles: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    jueves: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    viernes: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    sabado: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    domingo: z.object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    })
  }),
  fechasDiasNoTrabajados: z.array(z.object({
    id: z.string(),
    date: z.date()
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