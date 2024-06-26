import { differenceInDays, eachDayOfInterval, format, isWithinInterval, parse, parseISO } from "date-fns"
import { es } from 'date-fns/locale'
import { calculateHours } from "./calculate-hours"

export const calculateDays = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  return differenceInDays(endDate, startDate)
}

const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};


interface Values {
  start: string
  end: string
  values: any
  fechasNoTrabajadas: any[]
  incluirDiasNoTrabajados: boolean
  incluirHorasAlmuerzo: boolean
}

export const calculateHoursWithDays = ({
  start,
  end,
  values,
  fechasNoTrabajadas,
  incluirDiasNoTrabajados,
  incluirHorasAlmuerzo
}: Values) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const daysInRange = eachDayOfInterval({ start: startDate, end: endDate })
  let totalHours = 0
  daysInRange.forEach((day) => {
    const dayOfWeek = removeAccents(format(day, 'EEEE', { locale: es }).toLowerCase())
    const { inicio, fin } = values[dayOfWeek] || {}
    const { inicio: horaAlmuerzoInicio, fin: horaAlmuerzoFin } = values.horaAlmuerzo
    if (inicio && fin) {
      let workHours = calculateHours(inicio, fin, day)
      const start = parse(inicio, 'HH:mm', day)
      const end = parse(fin, 'HH:mm', day)
      if (horaAlmuerzoInicio && horaAlmuerzoFin) {
        const lunchStartTime = parse(horaAlmuerzoInicio, 'HH:mm', day)
        const lunchEndTime = parse(horaAlmuerzoFin, 'HH:mm', day)
        if (
          isWithinInterval(lunchStartTime, {start, end})  
          && isWithinInterval(lunchEndTime, {start, end})
          && incluirHorasAlmuerzo
        ){
          workHours -= calculateHours(horaAlmuerzoInicio, horaAlmuerzoFin, day)
        }
      }
      if (incluirDiasNoTrabajados) {
        const isNoWorkDate = fechasNoTrabajadas.some((item: any) => format(parseISO(item.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
        if (!isNoWorkDate) {
          totalHours += workHours
        }
      } else {
        totalHours += workHours
      }
    }
  })
  return totalHours
}   