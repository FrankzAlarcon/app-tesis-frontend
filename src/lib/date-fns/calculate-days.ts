import { differenceInDays } from "date-fns"

export const calculateDays = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  return differenceInDays(endDate, startDate)
}