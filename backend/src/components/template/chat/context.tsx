import { IMessage } from '@/types/chat'
import { ScenarioInterface } from "@/types/lesson/type"
import { createContext } from "react"

interface IChatContext {
  messages: IMessage[]
  lesson?: ScenarioInterface
  remainSeconds?: number
  openInfo?: () => void
  newChat?: () => void
}

const initialValues = {
  messages: [],
}

export const ChatContext = createContext<IChatContext>(initialValues)
