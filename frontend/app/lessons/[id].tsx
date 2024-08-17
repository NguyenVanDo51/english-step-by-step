import * as React from 'react'
import { View } from 'react-native'
import { Text } from '~/components/ui/text'
import { Stack, useLocalSearchParams } from 'expo-router'
import { LessonHTMLDataType, LessonPart, LessonPartType } from '~/types'
import { FlashCard } from '~/components/template/lesson-part/FlashCard'
import { Introduction } from '~/components/template/lesson-part/Introduction'
import { MapVocabulary } from '~/components/template/lesson-part/MapVocabulary'
import { PickCorrectAnswer } from '~/components/template/lesson-part/PickCorrectAnswer'
import { Button } from '~/components/ui/button'
import { useLessons } from '~/hooks/useLesson'
import { Completed } from '~/components/template/lesson-part/Completed'
import { router } from 'expo-router'

export default function Screen() {
  const { id } = useLocalSearchParams()
  const { lessons, refecthLesson } = useLessons()
  const pickCorrectAnswerRef = React.useRef<any>()

  const lesson = lessons?.find((l) => l.id === id)
  const [indexWrongAnswers, setIndexWrongAnswers] = React.useState<number[]>([])
  const [isCorrect, setIsCorrect] = React.useState<boolean | undefined>()

  const lessonPart = React.useMemo(() => {
    return lesson?.lessonPart[indexWrongAnswers[0]]
  }, [lesson, indexWrongAnswers])

  React.useEffect(() => {
    if (!lessons) return

    setIndexWrongAnswers(new Array(lesson?.lessonPart.length).fill(0).map((_, i) => i))
  }, [lessons])

  const onWrong = () => {
    setIsCorrect(false)
  }

  const onCorrect = () => {
    setIsCorrect(true)
  }

  const onNextPart = (isCorrectCheck: typeof isCorrect) => {
    if (isCorrectCheck) {
      const [_, ...rest] = indexWrongAnswers
      setIndexWrongAnswers(rest)
    } else {
      const [first, ...rest] = indexWrongAnswers
      setIndexWrongAnswers([...rest, first])
    }
    setIsCorrect(undefined)
    pickCorrectAnswerRef.current?.reset()
  }

  React.useEffect(() => {
    if (
      lessonPart?.type === LessonPartType.HTML_PAGE ||
      lessonPart?.type === LessonPartType.SLIDE
    ) {
      setIsCorrect(true)
    }
  }, [lessonPart?.type])

  if (!lesson) {
    return <Text>Loading...</Text>
  }

  return (
    <View className="flex-1 gap-4 p-4 bg-secondary/30">
      <Stack.Screen key={'header'} options={{ title: lesson?.title, headerBackTitle: 'Back' }} />

      <View className="flex-1">
        {!lessonPart ? (
          <Completed />
        ) : (
          {
            [LessonPartType.FLASH_CARD]: <FlashCard />,
            [LessonPartType.HTML_PAGE]: (
              <Introduction data={lessonPart?.data as unknown as LessonHTMLDataType} />
            ),
            [LessonPartType.MAP_VOCABULARY]: <MapVocabulary />,
            [LessonPartType.PICK_CORRECT_ANSWER]: (
              <PickCorrectAnswer
                ref={pickCorrectAnswerRef}
                data={lessonPart.data}
                onCorrect={onCorrect}
                onWrong={onWrong}
              />
            ),
            [LessonPartType.SLIDE]: <Text>Slide</Text>,
            [LessonPartType.COMPLETED]: <Completed />,
          }[lessonPart?.type ?? LessonPartType.COMPLETED]
        )}
      </View>

      {(isCorrect !== undefined || indexWrongAnswers.length < 1) && (
        <Button
          variant="default"
          onPress={() => {
            if (indexWrongAnswers.length < 1) {
              router.back()
            } else {
              onNextPart(isCorrect)
            }
          }}
        >
          <Text>Continue</Text>
        </Button>
      )}
    </View>
  )
}
