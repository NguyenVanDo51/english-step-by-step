import { useQuery } from '@tanstack/react-query'
import { httpClient } from '~/services/httpClient'
import { Lesson } from '~/types'

export const useLessons = () => {
  const { data: lessons, refetch: refecthLesson } = useQuery<Lesson[]>({
    queryKey: ['lessons'],
    queryFn: () => httpClient.get('/api/lessons').then((r) => r.data),
    refetchOnWindowFocus: false,
  })

  return { lessons, refecthLesson }
}
