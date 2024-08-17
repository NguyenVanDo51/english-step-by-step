import * as React from 'react'
import { View } from 'react-native'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { Link } from 'expo-router'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '~/components/ui/collapsible'
import { ChevronDown } from '~/lib/icons/ChevronDown'
import { ChevronRight } from '~/lib/icons/ChevronRight'
import { Lesson } from '~/types'
import { useSections } from '~/hooks/useSections'
import { useLessons } from '~/hooks/useLesson'

export default function Screen() {
  const [sectionOpened, setSectionOpened] = React.useState<string[]>([])
  const { sections, refecthSections } = useSections()
  const { lessons, refecthLesson } = useLessons()

  const sectionIdToLessons = React.useMemo(() => {
    const obj: { [key: string]: Lesson[] } = {}
    lessons?.forEach((lesson) => {
      if (obj[lesson.sectionId]) {
        obj[lesson.sectionId].push(lesson)
      } else {
        obj[lesson.sectionId] = [lesson]
      }
    })
    return obj
  }, [lessons])

  return (
    <View className="flex-1 bg-secondary/30">
      {sections?.map((section, index) => (
        <Collapsible
          key={section.id}
          open={sectionOpened.includes(section.id)}
          onOpenChange={(open) => {
            setSectionOpened((prev) => {
              if (open) {
                return [...prev, section.id]
              }
              return prev.filter((id) => id !== section.id)
            })
          }}
        >
          <CollapsibleTrigger>
            <View className="border-b border-secondary px-2 py-4 flex-1 flex-row justify-between">
              <Text className="font-semibold">
                Section {index + 1}: {section.title}
              </Text>
              {sectionOpened.includes(section.id) ? <ChevronDown /> : <ChevronRight />}
            </View>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <View className="flex-1 gap-4 p-3 w-full">
              {sectionIdToLessons[section.id]?.map((lesson) => (
                <Link
                  href={{
                    pathname: '/lessons/[id]',
                    params: { id: lesson.id },
                  }}
                  asChild
                  push
                >
                  <Card key={lesson.id} className="w-full p-4 rounded-2xl">
                    <CardTitle>{lesson.title}</CardTitle>

                    <CardContent className="p-0 mt-2">
                      <Text className="text-sm text-muted-foreground">
                        {lesson.shortDescription}
                      </Text>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </View>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </View>
  )
}
