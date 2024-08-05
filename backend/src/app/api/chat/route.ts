import { NextRequest, NextResponse } from "next/server"
import { createChatCompletion } from "@/libs/openai"

export async function POST(request: NextRequest) {
  const body = await request.json()
  return createChatCompletion(body.messages, body.max_tokens)
    .then((data) => {
      return NextResponse.json(data)
    })
    .catch((e: any) => {
      return new Response(e, {
        status: e.response.status || 500,
      })
    })
}
