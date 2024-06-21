import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export const formatDistanceEs = (start: string) => {
  const startDate = new Date(start)
  return formatDistanceToNow(startDate, { locale: es, addSuffix: true, includeSeconds: true})
}