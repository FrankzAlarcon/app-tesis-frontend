export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ES-es', {
    month: 'long',
    year: 'numeric'
  })
}

export const formatDateComplete = (date: string) => {
  return new Date(date).toLocaleDateString('ES-es', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  })
}

export function calculateEntryDate(entryDate: string): string {
  // Get the current date
  const currentDate: Date = new Date();

  // Convert the provided date to a Date object
  const parsedEntryDate: Date = new Date(entryDate);

  // Calculate the difference in milliseconds between the current date and the entry date
  const timeDifference: number = currentDate.getTime() - parsedEntryDate.getTime();

  // Calculate the difference in days
  const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24) + 1);

  // Calculate the difference in weeks
  const weeks: number = Math.floor(days / 7);

  // Calculate the difference in months
  const months: number = currentDate.getMonth() - parsedEntryDate.getMonth() + (12 * (currentDate.getFullYear() - parsedEntryDate.getFullYear()));

  // Return the entry date in days, weeks, or months
  if (days === 1) {
    return 'Hace 1 día';
  } else if (days < 7) {
    return `Hace ${days} días`;
  } else if (weeks === 1) {
    return 'Hace 1 semana';
  } else if (weeks < 4) {
    return `Hace ${weeks} semanas`;
  } else if (months === 1) {
    return 'Hace 1 mes';
  } else {
    return `Hace ${months} meses`;
  }
}




