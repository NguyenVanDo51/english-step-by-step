import * as React from 'react'
import { View } from 'react-native'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { lessons } from '~/mocks/lesson'
import { Href, Link, Stack, useLocalSearchParams, useNavigation } from 'expo-router'
import { LessonHTMLDataType, LessonPart, LessonPartType } from '~/types/lesson'
import { FlashCard } from '~/components/template/lesson-part/FlashCard'
import { Introduction } from '~/components/template/lesson-part/Introduction'
import { MapVocabulary } from '~/components/template/lesson-part/MapVocabulary'
import { PickCorrectAnswer } from '~/components/template/lesson-part/PickCorrectAnswer'
import { Button } from '~/components/ui/button'
import { useEffect } from 'react'

export default function Screen() {
  const { id } = useLocalSearchParams()
  const lesson = lessons.find((l) => l.id === id)
  const [currentPart, setCurrentPart] = React.useState(0)
  const lessonPart = lesson?.lessonPart[currentPart]
  const navigation = useNavigation()

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false })
  // }, [navigation])
  if (!lessonPart) {
    return <Text>Not found</Text>
  }

  return (
    <View className="flex-1 gap-4 p-4 bg-secondary/30">
      <Stack.Screen options={{ title: lesson?.title, headerBackTitle: 'Back' }} />

      <View className="flex-1">
        {
          {
            [LessonPartType.FLASH_CARD]: <FlashCard />,
            [LessonPartType.HTML_PAGE]: (
              <Introduction lessonPart={lessonPart as unknown as LessonPart<LessonHTMLDataType>} />
            ),
            [LessonPartType.MAP_VOCABULARY]: <MapVocabulary />,
            [LessonPartType.PICK_CORRECT_ANSWER]: <PickCorrectAnswer />,
          }[lessonPart?.type ?? LessonPartType.HTML_PAGE]
        }
      </View>

      <Button variant="default" onPress={() => setCurrentPart((p) => p + 1)}>
        <Text>Continue</Text>
      </Button>
    </View>
  )
}
