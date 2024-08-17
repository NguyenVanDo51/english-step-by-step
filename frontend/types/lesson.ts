export type LessonHTMLDataType = {
  id: string
  content: string[] // html | markdown | Mỗi trang HTML là một phần tử của mảng
}

export type LessonPickCorrectAnswerDataType = {
  id: string
  question: string // html | markdown
  correctAnswer: string
  wrongAnswer: string[]
  explanation?: string // html | markdown
}

export type LessonSlideDataType = {
  id: string
  text: string
  image: string
}

export enum LessonPartType {
  HTML_PAGE = 'HTML_PAGE',
  FLASH_CARD = 'FLASHCARD',
  PICK_CORRECT_ANSWER = 'PICK_CORRECT_ANSWER',
  MAP_VOCABULARY = 'MAP_VOCABULARY',
  SLIDE = 'SLIDE',
  COMPLETED = 'COMPLETED',
}

export type LessonPart<T = any> = {
  id: string
  order: number
  type: LessonPartType
  data?: T //  | nếu type là FLASH_CARD hoặc MAP_VOCABULARY thì data là undefined
}

export type Vocabulary = {
  en: string
  vi: string
  enPronunciation: string
}

export type Lesson = {
  id: string
  sectionId: string
  title: string
  shortDescription: string
  longDescription?: string
  lessonPart: LessonPart[]
  vocabularies?: Vocabulary[]
}
