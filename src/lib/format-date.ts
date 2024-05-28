export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ES-es', {
    month: 'long',
    year: 'numeric'
  })
}