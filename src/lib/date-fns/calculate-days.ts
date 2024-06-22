import { differenceInDays, eachDayOfInterval, format, isWithinInterval, parse } from "date-fns"
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


export const calculateHoursWithDays = (start: string, end:string, values: any) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const daysInRange = eachDayOfInterval({ start: startDate, end: endDate })
  let totalHours = 0
  daysInRange.forEach((day) => {
    const dayOfWeek = removeAccents(format(day, 'EEEE', { locale: es }).toLowerCase())
    const { inicio, fin } = values[dayOfWeek] || {}
    const { inicio: horaAlmuerzoInicio, fin: horaAlmuerzoFin } = values.horaAlmuerzo
    if (inicio && fin) {
      totalHours += calculateHours(inicio, fin, day)
      const start = parse(inicio, 'HH:mm', day)
      const end = parse(fin, 'HH:mm', day)
      if (horaAlmuerzoInicio && horaAlmuerzoFin) {
        const lunchStartTime = parse(horaAlmuerzoInicio, 'HH:mm', day)
        const lunchEndTime = parse(horaAlmuerzoFin, 'HH:mm', day)

        if (
          isWithinInterval(lunchStartTime, {start, end})  
          && isWithinInterval(lunchEndTime, {start, end})
        ){
          totalHours -= calculateHours(horaAlmuerzoInicio, horaAlmuerzoFin, day)
        }
      }
    }
    
  })
  return totalHours
}   