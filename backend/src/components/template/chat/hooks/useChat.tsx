import { scrollToBottom, ScrollSelecter } from "@/libs/helpers/dom"
import { SpeakerService } from "@/service/speaker"
import { IMessage } from "@/types/chat"
import { AxiosResponse } from "axios"
import { useState, useCallback, useEffect } from "react"
import { v4 } from "uuid"
import { ChatService } from "../service"
import { SendMessageBody } from "../service/request"
import { ScenarioInterface } from "@/types/lesson/type"
import { useSettings } from "@/hooks/helpers/use-settings"
import { useUser } from "@clerk/nextjs"

export const useChat = (lesson: ScenarioInterface) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isWaiting, setIsWaiting] = useState(false)
  const [remainSeconds, setRemainSeconds] = useState<number>()
  const {
    settings: { automationMode },
  } = useSettings()

  const user = useUser()

  const sendMessage = async (message: string | Blob, recorded?: string) => {
    if (isWaiting) return
    if (typeof message === "string" && !message.trim()) return

    const messageObject: IMessage = {
      id: v4(),
      role: "user",
      content: "",
      recorded,
    }

    if (typeof message === "string") {
      messageObject.content = message?.trim()
    } else {
      setIsWaiting(true)

      const res = await ChatService.speechToText(message).finally(() =>
        setIsWaiting(false)
      )
      if (res.data?.trim()?.length > 0) {
        messageObject.content = res.data.trim()
      }
    }

    if (!messageObject.content) {
      return
    }
    setTimeout(() => {
      scrollToBottom(ScrollSelecter.Message)
    }, 100)

    const newMesages: IMessage[] = [...messages, messageObject]
    setMessages(newMesages)
  }

  const getAnswer = useCallback(() => {
    const newMesages: IMessage[] = [...messages]
    const userMessage = newMesages.at(-1)
    if (userMessage?.role !== "user") return
    if (userMessage.status === "success") return

    const bodyMessage: SendMessageBody[] = [...messages, userMessage].map(
      (message) => ({
        role: message.role as SendMessageBody["role"],
        content:
          message.content.at(-1) !== "."
            ? `${message.content}.`
            : message.content,
      })
    )
    setIsWaiting(true)
    ChatService.sendMessageInSituation(lesson, bodyMessage)
      .then((res: AxiosResponse<string>) => {
        let messageResponse = res.data

        newMesages[messages.length - 1].status = "success"
        newMesages.push({
          id: v4(),
          role: "assistant",
          content: messageResponse,
        })
        setMessages(newMesages)
      })
      .catch(() => {
        newMesages[messages.length - 1].status = "error"
        setMessages(newMesages)
      })
      .finally(() => setIsWaiting(false))
  }, [lesson, messages])

  const getFirstMessage = useCallback(() => {
    const messageResponse = lesson.assistantFirstMessage

    if (messageResponse) {
      const message: IMessage = {
        id: v4(),
        role: "assistant",
        content: messageResponse,
      }
      setMessages([message])
      return
    }

    let newMesages: IMessage[] = []
    setIsWaiting(true)
    ChatService.sendMessageInSituation(lesson, [{ role: "user", content: "." }])
      .then((res: AxiosResponse<string>) => {
        let messageResponse = res.data

        newMesages.push({
          id: v4(),
          role: "assistant",
          content: messageResponse,
        })
        setMessages(newMesages)
      })
      .catch(() => {
        setMessages(newMesages)
      })
      .finally(() => setIsWaiting(false))
  }, [lesson])

  const reSend = () => {
    getAnswer()
  }

  const newestMessage = messages.at(-1)

  useEffect(() => {
    if (
      newestMessage?.role === "assistant" &&
      newestMessage?.status !== "error" &&
      newestMessage?.status !== "sent"
    ) {
      SpeakerService.speak(newestMessage.content)
      if (automationMode) {
        setRemainSeconds(3)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestMessage])

  useEffect(() => {
    if (newestMessage?.status !== "error") {
      getAnswer()
    }

    if (messages?.length > 1) {
      localStorage.setItem(user?.user?.id + lesson.id, JSON.stringify(messages))
    }
  }, [getAnswer, lesson.id, messages, newestMessage?.status, user?.user?.id])

  useEffect(() => {
    const oldMessageParsed = JSON.parse(
      localStorage.getItem(user?.user?.id + lesson.id) || "[]"
    )
    if (Array.isArray(oldMessageParsed) && oldMessageParsed?.length > 0) {
      setMessages(oldMessageParsed)
      return
    }
    getFirstMessage()
  }, [getFirstMessage, lesson.id, user?.user?.id])

  useEffect(() => {
    scrollToBottom(ScrollSelecter.Message)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestMessage])

  return {
    messages,
    isWaiting,
    remainSeconds,
    setMessages,
    reSend,
    sendMessage,
    getFirstMessage,
  }
}
