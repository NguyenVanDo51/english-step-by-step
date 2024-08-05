import { SendMessageBody } from "./request"
import { httpClient } from "../../../../service/httpClient"
import { IMessage } from "@/types/chat"
import { ScenarioInterface } from "@/types/lesson/type"
import { ISetting } from "@/types/setting"
import { queryClient } from "@/app/Provider"

export class ChatService {
  static sendMessageInSituation = (
    lesson: ScenarioInterface,
    messages: SendMessageBody[]
  ) => {
    const bodyMessages = [...messages]
    // if (bodyMessages.length > 32) {
    //   bodyMessages.splice(0, bodyMessages.length - 10)
    // }
    return httpClient.post("/api/situations/" + lesson.id, {
      lesson,
      messages: bodyMessages,
    })
  }

  static checkGrammar = (messages: SendMessageBody[]) => {
    const settings = queryClient.getQueryData<ISetting>(["settings"])

    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post(`/api/chat/grammar?lang=${settings?.lang}`, {
      messages: bodyMessages,
    })
  }

  static speechToText = (audio: Blob) => {
    const formData = new FormData()
    formData.append("file", audio)

    return httpClient.post("/api/chat/speech-to-text", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static getSuggestion = (
    lesson: ScenarioInterface,
    messages: SendMessageBody[]
  ) => {
    let bodyMessages: IMessage[] = JSON.parse(JSON.stringify(messages))
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }

    bodyMessages = bodyMessages.map((message: IMessage) => {
      if (message.role === "user") {
        message.role = "assistant"
      } else {
        message.role = "user"
      }
      return { role: message.role, content: message.content }
    })

    return httpClient.post("/api/situations/" + lesson.id + "/suggestions", {
      lesson,
      messages: bodyMessages,
    })
  }
}
