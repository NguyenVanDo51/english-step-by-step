import { generateLessonPrompt, createChatCompletion } from "@/libs/openai"
import { ScenarioInterface } from "@/types/lesson/type"
import { NextResponse } from "next/server"

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json()
  const lesson = body.lesson

  const messages = [
    {
      role: "system",
      content: generateLessonPrompt(lesson as ScenarioInterface),
    },
    ...body.messages,
  ]

  return createChatCompletion(messages, { max_tokens: 200, temperature: 0.5 })
    .then((data) => {
      return NextResponse.json(
        data?.toLowerCase().includes("done_message") ? "ok" : data
      )
    })
    .catch((e: any) => {
      return new Response(e.response ?? e, {
        status: e.response.status || 500,
      })
    })
}
