import { SendMessageBody } from "@/components/template/chat/service/request"
import { createChatCompletion, openai } from "@/libs/openai"
import { SettingLangEnum, SettingLangMapping } from "@/types/setting"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const lang: SettingLangEnum =
    (request.nextUrl.searchParams.get("lang") as SettingLangEnum) ||
    SettingLangEnum.EN

  const systemMessage = {
    role: "system",
    content: `You receive an English sentence. Your task is to provide a brief explanation of any grammatical errors in it (if there are any).
    
      Requirements:
      - Response language: ${SettingLangMapping[lang]}.`,
    // - The response should be encouraging to the learner.
  }
  const messages = [
    systemMessage,
    ...body.messages.map(({ content, ...m }: SendMessageBody) => ({
      ...m,
      content: `"${
        /[a-z]/.test(content.trim().at(-1) as string) ? content + "." : content
      }"`,
    })),
  ]

  return createChatCompletion(messages, body.max_tokens || 500)
    .then((res: any) => {
      return NextResponse.json(res)
    })
    .catch((e: any) => {
      return new Response(e, {
        status: e.response.status || 500,
      })
    })
}
