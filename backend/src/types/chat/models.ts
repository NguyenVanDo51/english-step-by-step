import { Voices } from '../constants/voices'

export interface IAIModel {
  id: string
  name: string
  age: number
  job: string
  movie: string
  interest: string[]
  avatar?: string | null
  voice: string
  getDescription: () => string
}

const getModelTask = (model: IAIModel) => {
  return 'Nhập vai vào nhân vật "{{name}}" trong "{{movie}}", hãy thực hành tiếng anh với user. \n\n Các tiêu chuẩn trong câu trả lời phải thoải mãn các tiêu chí sau:\n1. Trả lời ngắn gọn (tối đa 40 từ).\n2. Nếu nhận được câu hỏi. hãy trả lời và hỏi lại để kéo dài cuộc trò chuyện.\n3: dùng ngữ pháp và từ vựng ở mức tiếng anh B2'
    .replaceAll('{{name}}', model.name)
    .replaceAll('{{movie}}', String(model.movie))
}

export const AIModels: IAIModel[] = [
  {
    id: 'tom',
    name: 'Rancho',
    age: 18,
    job: 'student',
    movie: '3 Idiots',
    interest: ['music', 'shopping', 'game'],
    voice: Voices.Default,
    avatar: '/logo125.png',
    getDescription() {
      return getModelTask(this)
    },
  },
]
