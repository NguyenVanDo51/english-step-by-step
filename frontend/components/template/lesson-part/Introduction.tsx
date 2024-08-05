import { FC } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { LessonHTMLDataType, LessonPart } from '~/types/lesson'
import RenderHtml from 'react-native-render-html'

type IntroductionProps = {
  lessonPart: LessonPart<LessonHTMLDataType>
}

export const Introduction: FC<IntroductionProps> = ({ lessonPart }) => {
  const { width } = Dimensions.get('window')
  return (
    <View>
      <Text>Giới thiệu</Text>
      <RenderHtml contentWidth={width} source={{ html: lessonPart.data?.content as string }} />
    </View>
  )
}
