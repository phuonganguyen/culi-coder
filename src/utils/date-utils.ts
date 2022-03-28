import siteMetadata from "@/data/siteMetadata";

export const currentDayName = () => {
  const date = new Date()
  return date.toLocaleString('default', { weekday: 'long' })
}

export const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions

  return new Date(date).toLocaleDateString(siteMetadata.locale, options)
}
