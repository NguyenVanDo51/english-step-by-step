import { useQuery } from '@tanstack/react-query'
import { httpClient } from '~/services/httpClient'
import { Section } from '~/types'

export const useSections = () => {
  const { data: sections, refetch: refecthSections } = useQuery<Section[]>({
    queryKey: ['sections'],
    queryFn: () => httpClient.get('/api/sections').then((r) => r.data),
    refetchOnWindowFocus: false,
  })

  return { sections, refecthSections }
}
