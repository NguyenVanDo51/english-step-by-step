"use client"
import { FC, useState } from "react"
import { InputBox } from "./components/InputBox"
import { Message } from "./components/messages"
import { IMessage } from "@/types/chat"
import { Header } from "./components/Header"
import { ChatContext } from "./context"
import { ScenarioInterface } from "@/types/lesson/type"
import { useChat } from "./hooks/useChat"
import { useRouter } from "next/navigation"
import { ChatInfo } from "./components/ChatInfo"

export type IAnalystMessage = IMessage & { comment: string }

interface IProps {
  lesson: ScenarioInterface
}

const AIChat: FC<IProps> = ({ lesson }) => {
  const {
    messages,
    isWaiting,
    setMessages,
    reSend,
    sendMessage,
    getFirstMessage,
  } = useChat(lesson)
  const [open, setOpen] = useState(false)

  const newChat = () => {
    setOpen(false)
    setMessages([])
    setTimeout(() => {
      getFirstMessage()
    }, 400)
  }

  return (
    <ChatContext.Provider
      value={{ messages, lesson, openInfo: () => setOpen(true), newChat }}
    >
      <div className="h-full">
        <Header />

        <div className="">
          <ChatInfo open={open} onClose={() => setOpen(false)} />
          <Message
            isSending={isWaiting}
            setMessages={setMessages}
            reSend={reSend}
          />
          <InputBox sendMessage={sendMessage} isWaiting={isWaiting} />
        </div>

        {/* <div className="pt-4 flex flex-col gap-4">
          <Suggestions />
          <Translation />
        </div> */}
      </div>
    </ChatContext.Provider>
  )
}

export default AIChat
