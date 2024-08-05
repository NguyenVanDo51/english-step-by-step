import { openai } from "@/libs/openai"
import axios, { AxiosResponse } from "axios"

export async function GET(req: Request) {
  const searchParams = new URLSearchParams(
    decodeURI(req.url).substring(req.url.indexOf("?"))
  )

  const text = searchParams?.get("text")
  const fromLang = searchParams?.get("fromLang")
  const toLang = searchParams?.get("toLang")

  if (!process.env?.GOOGLE_API_KEY)
    return new Response("text can not empty", { status: 201 })
  if (!text) return new Response("text can not empty", { status: 201 })

  try {
    // let url = `https://translation.googleapis.com/language/translate/v2?key=${process.env?.GOOGLE_API_KEY}`
    // url += "&q=" + encodeURI(text)
    // // url += `&source=${fromLang}`
    // url += `&target=${toLang}`

    // const res: AxiosResponse<ITranslationResponse> = await axios.get(url)
    // return new Response(res.data.data.translations[0].translatedText)

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with a sentence in any language, and your task is to translate it into English.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    })
    return new Response(response.choices?.[0]?.message?.content)
  } catch (error: any) {
    console.error(error)
    return new Response("")
  }
}

interface ITranslationResponse {
  data: {
    translations: [
      {
        translatedText: string
      }
    ]
  }
}
