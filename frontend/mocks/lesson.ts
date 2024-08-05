import { Lesson, LessonPartType } from '~/types/lesson'

const lesson1: Lesson = {
  id: 'lesson1',
  sectionId: '3',
  title: 'Giới thiệu bản thân',
  shortDescription: 'Học cách giới thiệu bản thân bằng tiếng Anh',
  longDescription:
    'Bài học này giúp người học hiểu và sử dụng các từ vựng, ngữ pháp cơ bản liên quan đến việc giới thiệu bản thân, và thực hành giới thiệu bản thân bằng tiếng Anh.',
  lessonPart: [
    {
      id: 'part1',
      order: 1,
      type: LessonPartType.HTML_PAGE,
      data: {
        id: 'intro1',
        content:
          '<p>Trong bài học này, bạn sẽ học cách giới thiệu bản thân bằng tiếng Anh. Hãy bắt đầu bằng việc học các từ vựng cơ bản như tên, tuổi, quê hương, sở thích và nghề nghiệp.</p>',
      },
    },
    {
      id: 'part2',
      order: 2,
      type: LessonPartType.FLASH_CARD,
    },
    {
      id: 'part3',
      order: 3,
      type: LessonPartType.PICK_CORRECT_ANSWER,
      data: [
        {
          id: 'question1',
          question: 'I ___ from Hanoi.',
          correctAnswer: 'come',
          wrongAnswer: ['goes', 'eat'],
        },
        {
          id: 'question2',
          question: 'My hobby is ___.',
          correctAnswer: 'reading books',
          wrongAnswer: ['sleeping', 'cooking'],
        },
      ],
    },
    {
      id: 'part4',
      order: 4,
      type: LessonPartType.MAP_VOCABULARY,
    },
  ],
  vocabularies: [
    { en: 'Name', vi: 'Tên', enPronunciation: '/neɪm/' },
    { en: 'Age', vi: 'Tuổi', enPronunciation: '/eɪdʒ/' },
    { en: 'Hometown', vi: 'Quê hương', enPronunciation: '/ˈhoʊm.taʊn/' },
    { en: 'Hobby', vi: 'Sở thích', enPronunciation: '/ˈhɑː.bi/' },
    { en: 'Occupation', vi: 'Nghề nghiệp', enPronunciation: '/ˌɒk.jəˈpeɪ.ʃən/' },
    { en: 'Family', vi: 'Gia đình', enPronunciation: '/ˈfæm.ə.li/' },
  ],
}

const lesson2: Lesson = {
  id: 'lesson2',
  title: 'Nói về sở thích',
  sectionId: '3',
  shortDescription: 'Học cách nói về sở thích bằng tiếng Anh',
  longDescription:
    'Bài học này giúp người học hiểu và sử dụng các từ vựng, ngữ pháp cơ bản liên quan đến việc nói về sở thích, và thực hành mô tả sở thích bằng tiếng Anh.',
  lessonPart: [
    {
      id: 'part1',
      order: 1,
      type: LessonPartType.HTML_PAGE,
      data: {
        id: 'intro1',
        content: [
          '<p>Trong bài học này, bạn sẽ học cách nói về sở thích bằng tiếng Anh. Hãy bắt đầu bằng việc học các từ vựng cơ bản như âm nhạc, đọc sách, thể thao, du lịch và các sở thích khác.</p>',
        ],
      },
    },
    {
      id: 'part2',
      order: 2,
      type: LessonPartType.FLASH_CARD,
    },
    {
      id: 'part3',
      order: 3,
      type: LessonPartType.PICK_CORRECT_ANSWER,
      data: [
        {
          id: 'question1',
          question: 'My favorite hobby is ___.',
          correctAnswer: 'reading books',
          wrongAnswer: ['eating', 'sleeping'],
        },
        {
          id: 'question2',
          question: 'I enjoy ___ music.',
          correctAnswer: 'listening to',
          wrongAnswer: ['playing', 'watching'],
        },
      ],
    },
    {
      id: 'part4',
      order: 4,
      type: LessonPartType.MAP_VOCABULARY,
    },
  ],
  vocabularies: [
    { en: 'Music', vi: 'Âm nhạc', enPronunciation: '/ˈmjuː.zɪk/' },
    { en: 'Reading', vi: 'Đọc sách', enPronunciation: '/ˈriː.dɪŋ/' },
    { en: 'Sports', vi: 'Thể thao', enPronunciation: '/spɔːrts/' },
    { en: 'Traveling', vi: 'Du lịch', enPronunciation: '/ˈtræv.əl.ɪŋ/' },
    { en: 'Watching movies', vi: 'Xem phim', enPronunciation: '/ˈwɑː.tʃɪŋ ˈmuː.viz/' },
    { en: 'Playing games', vi: 'Chơi trò chơi', enPronunciation: '/ˈpleɪ.ɪŋ ɡeɪmz/' },
  ],
}

export const lessons: Lesson[] = [
  {
    id: 'modau',
    title: 'Chào mừng bạn',
    sectionId: '1',
    shortDescription:
      'Mỗi người có một mục tiêu và cách học riêng khi học tiếng anh, hãy tìm hiểu sứ mệnh của chúng mình xem có phù hợp với bạn không nhé!',
    lessonPart: [
      {
        id: 'a',
        order: 1,
        type: LessonPartType.HTML_PAGE,
        data: {
          id: 'a',
          content: '<p>Đây là trang giới thiệu về ứng dụng</p>',
        },
      },
    ],
  },
  lesson1,
  lesson2,
]
