import { FC } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { LessonHTMLDataType, LessonPart } from '~/types/lesson'
import RenderHtml from 'react-native-render-html'

type IntroductionProps = {
  data: LessonHTMLDataType
}

export const Introduction: FC<IntroductionProps> = ({ data }) => {
  const { width } = Dimensions.get('window')
  return (
    <View>
      <Text>Giới thiệu</Text>
      <RenderHtml contentWidth={width} source={{ html: data?.content[0] as string }} />
    </View>
  )
}
