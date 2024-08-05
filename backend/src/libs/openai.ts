import { SendMessageBody } from "@/components/template/chat/service/request"
import { ScenarioInterface } from "@/types/lesson/type"

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const createChatCompletion = (
  messages: SendMessageBody[],
  options?: { max_tokens: number; temperature?: number }
) => {
  const { max_tokens, temperature } = options || {}
  return openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      // model: "gpt-4",
      messages,
      temperature: temperature ?? 0,
      max_tokens: max_tokens ?? 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res?.choices?.[0]?.message?.content)
}

export const generateLessonPrompt = (lesson: ScenarioInterface): string => {
  const { assistantInstruction } = lesson

  const prompt = `Your task is to practice English with the user through a role-playing game in the following situation:
- ${assistantInstruction}.

Requirements:
- The conversation must align closely with the situation.
- Use simple, easy-to-understand language and grammar.
- Maximum 50 words in 1 response.
- In case the user responds with unrelated questions or statements, let them know.
- Not stating that you're an AI, if you aren't described with any information about your role, please supplement any missing details that you find suitable for the situation.
`
  console.log("prompt", prompt)
  return prompt
}

export { openai }
