import { User } from "@clerk/nextjs/server"
import { Dayjs } from "dayjs"

export interface ScenarioInterface {
  id: string
  name: string // tên của tình huống
  assistantInstruction: string // hướng dẫn chi tiết vai trò cho AI và nên tương tác với người dùng thế nào (đóng vai ai, hoàn cảnh, câu truyện, nhiệm vụ,...)
  userInstruction: string // một câu ngắn mô tả nhiệm vụ chính của người dùng
  botImage: string // ảnh minh họa cho tình huống
  assistantFirstMessage?: string // câu đầu tiên của assistant
  public: boolean // có public hay không
  tags: string[] // các tags mô tả về tình huống. vd: work, school,...
  createdBy: string
  createdAt: string | number
  used: number

  author?: User
}
