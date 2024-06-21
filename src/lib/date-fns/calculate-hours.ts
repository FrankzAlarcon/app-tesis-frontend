import { differenceInHours, parse } from "date-fns"

export const calculateHours = (start: string, end: string) => {
  const format = 'HH:mm'
  const startDate = parse(start, format, new Date())
  const endDate = parse(end, format, new Date())
  return differenceInHours(endDate, startDate)
}