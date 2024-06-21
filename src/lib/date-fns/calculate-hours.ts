import { differenceInHours, isWithinInterval, parse } from "date-fns"

export const calculateHours = (start: string, end: string, referenceDay?: any) => {
  const format = 'HH:mm'
  let startDate = null
  let endDate = null
  if (referenceDay) {
    startDate = parse(start, format, referenceDay)
    endDate = parse(end, format, referenceDay)
  } else {
    startDate = parse(start, format, new Date())
    endDate = parse(end, format, new Date())
  }
  return differenceInHours(endDate, startDate)
}

export const calculateSemanalWorkHours = (newValue: any) => {
  const keyDays = Object.keys(newValue).filter((key) => ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].includes(key))
  if (keyDays.length === 0) return 0
  let totalHours = 0
  const { inicio: horaAlmuerzoInicio, fin: horaAlmuerzoFin } = newValue.horaAlmuerzo
  keyDays.forEach((key) => {
    const { inicio, fin } = newValue[key]
    if (inicio && fin) {
      totalHours += calculateHours(inicio, fin)
      const day = new Date()
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