import { format, isToday, isPast, isValid, startOfDay } from 'date-fns'

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'yyyy-MM-dd')
}

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'HH:mm:ss')
}

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMM dd, yyyy HH:mm')
}

export const isValidDate = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return isValid(dateObj)
}

export const isTodayOrPast = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return isToday(dateObj) || isPast(startOfDay(dateObj))
}

export const getTodayString = (): string => {
  return formatDate(new Date())
}

export const getDisplayDate = (date: string): string => {
  const dateObj = new Date(date)
  if (isToday(dateObj)) {
    return 'Today'
  }
  return format(dateObj, 'MMM dd, yyyy')
}