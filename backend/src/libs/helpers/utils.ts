export function cleanInput(s: any) {
  if (typeof s === 'undefined') return ''
  if (s === null) return ''
  return s.trim()
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}/${path}`
}
