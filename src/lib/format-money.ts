export const formatMoney = (amount: string) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(amount))
}