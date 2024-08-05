import { NextResponse } from "next/server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY as string
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Xây dựng nội dung cho ứng dụng học tiếng anh theo lộ trình từ đầu:\n1. Đối tượng ng dùng: người mới học và ko biết học từ đâu\n2. Ứng dụng sẽ bao gồm nhiều section (ví dụ: Tiếng anh cơ bản, chủ đề quen thuộc, ...), mỗi section sẽ có nhiều lesson. Trong một lesson sẽ có các thông tin dựa trên interface sau:\n3. Lộ trình sẽ bắt đầu từ những kiến thức nền tảng nhất như bảng chữ cái, chủ ngữ,... đến các phần thì, chủ đề hàng ngày\n\nexport type LessonHTMLDataType = {\n  id: string\n  content: string[] // html | markdown | Mỗi trang HTML là một phần tử của mảng\n}\n\nexport type LessonPickCorrectAnswerDataType = {\n  id: string\n  question: string // html | markdown\n  correctAnswer: string\n  wrongAnswer: string[]\n}\n\nexport enum LessonPartType {\n  HTML_PAGE = 'HTML_PAGE', // nội dung lý thuyết \n  PICK_CORRECT_ANSWER = 'PICK_CORRECT_ANSWER', // câu hỏi trắc nghiệm liên quan đến lý thuyết\n}\n\nexport type LessonPart<T = any> = {\n  id: string\n  order: number\n  type: LessonPartType\n  data?: T //  | nếu type là HTML_PAGE thì data là LessonHTMLDataType, ...\n}\n\nexport type Vocabulary = {\n  en: string\n  vi: string\n  enPronunciation: string\n}\n\nexport type Lesson = {\n  id: string\n  sectionId: string\n  title: string\n  shortDescription: string\n  longDescription?: string\n  lessonPart: LessonPart[]\n  vocabularies?: Vocabulary[]\n}\n\nĐây là một ví dụ của chủ đề lesson \"Bảng chữ cái\", nằm trong section \"Tiếng anh nền tảng\":\n\
    \"id\": \"lesson-1\",\n  \"sectionId\": \"alphabet-section\",\n  \"title\": \"Bài 1: Học bảng chữ cái\",\n  \"shortDescription\": \"Giới thiệu về bảng chữ cái và cách phát âm.\",\n  \"longDescription\": \"Trong bài học này, bạn sẽ học về bảng chữ cái tiếng Anh, cách phát âm từng chữ cái và một số từ vựng cơ bản liên quan. Bạn sẽ cần hoàn thành các bài tập để kiểm tra kiến thức của mình.\",\n  \"lessonPart\": [\n    {\n      \"type\": \"HTML_PAGE\",\n      \"data\": {\n        \"id\": \"html-page-1\",\n        \"content\": [\n          \"<h1>Bảng Chữ Cái Tiếng Anh</h1><p>Bảng chữ cái tiếng Anh bao gồm 26 chữ cái: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.</p><p>Mỗi chữ cái có một cách phát âm riêng. Dưới đây là cách phát âm của từng chữ cái:</p><ul><li>A: /eɪ/</li><li>B: /biː/</li><li>C: /siː/</li><li>D: /diː/</li><li>E: /iː/</li><li>F: /ɛf/</li><li>G: /dʒiː/</li><li>H: /eɪtʃ/</li><li>I: /aɪ/</li><li>J: /dʒeɪ/</li><li>K: /keɪ/</li><li>L: /ɛl/</li><li>M: /ɛm/</li><li>N: /ɛn/</li><li>O: /oʊ/</li><li>P: /piː/</li><li>Q: /kjuː/</li><li>R: /ɑːr/</li><li>S: /ɛs/</li><li>T: /tiː/</li><li>U: /juː/</li><li>V: /viː/</li><li>W: /ˈdʌbəl.juː/</li><li>X: /ɛks/</li><li>Y: /waɪ/</li><li>Z: /zɛd/</li></ul>\"\n        ]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q1\",\n        \"question\": \"Chữ cái nào có cách phát âm là /biː/?\",\n        \"correctAnswer\": \"B\",\n        \"wrongAnswer\": [\"A\", \"C\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q2\",\n        \"question\": \"Chữ cái nào có cách phát âm là /dʒiː/?\",\n        \"correctAnswer\": \"G\",\n        \"wrongAnswer\": [\"H\", \"J\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q3\",\n        \"question\": \"Chữ cái nào có cách phát âm là /ɛl/?\",\n        \"correctAnswer\": \"L\",\n        \"wrongAnswer\": [\"I\", \"K\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q4\",\n        \"question\": \"Chữ cái nào có cách phát âm là /ɛn/?\",\n        \"correctAnswer\": \"N\",\n        \"wrongAnswer\": [\"M\", \"O\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q5\",\n        \"question\": \"Chữ cái nào có cách phát âm là /oʊ/?\",\n        \"correctAnswer\": \"O\",\n        \"wrongAnswer\": [\"P\", \"Q\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q6\",\n        \"question\": \"Chữ cái nào có cách phát âm là /piː/?\",\n        \"correctAnswer\": \"P\",\n        \"wrongAnswer\": [\"Q\", \"R\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q7\",\n        \"question\": \"Chữ cái nào có cách phát âm là /ɛs/?\",\n        \"correctAnswer\": \"S\",\n        \"wrongAnswer\": [\"T\", \"U\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q8\",\n        \"question\": \"Chữ cái nào có cách phát âm là /viː/?\",\n        \"correctAnswer\": \"V\",\n        \"wrongAnswer\": [\"W\", \"X\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q9\",\n        \"question\": \"Chữ cái nào có cách phát âm là /waɪ/?\",\n        \"correctAnswer\": \"Y\",\n        \"wrongAnswer\": [\"X\", \"Z\"]\n      }\n    },\n    {\n      \"type\": \"PICK_CORRECT_ANSWER\",\n      \"data\": {\n        \"id\": \"q10\",\n        \"question\": \"Chữ cái nào có cách phát âm là /zɛd/?\",\n        \"correctAnswer\": \"Z\",\n        \"wrongAnswer\": [\"Y\", \"W\"]\n      }\n    }\n  ]\n}\n
    Nhận section và chủ đề của lesson, hãy tạo các dữ liệu lesson giống như mẫu trên\n`,
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
}

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.search)
  const section = searchParams.get("section")?.trim() ?? ""
  const lesson = searchParams.get("lesson")?.trim() ?? ""

  if (!section || !lesson) {
    return new Response("Invalid", {
      status: 500,
    })
  }

  const chatSession = model.startChat({
    generationConfig,

    history: [
      {
        role: "user",
        parts: [
          {
            text: 'Section: "Tiếng anh nền tảng", chủ đề lesson: "Bảng chữ cái"',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{"id": "lesson-1", "sectionId": "alphabet-section", "title": "Bài 1: Học bảng chữ cái", "shortDescription": "Giới thiệu về bảng chữ cái và cách phát âm.", "longDescription": "Trong bài học này, bạn sẽ học về bảng chữ cái tiếng Anh, cách phát âm từng chữ cái và một số từ vựng cơ bản liên quan. Bạn sẽ cần hoàn thành các bài tập để kiểm tra kiến thức của mình.", "lessonPart": [{"type": "HTML_PAGE", "data": {"id": "html-page-1", "content": ["<h1>Bảng Chữ Cái Tiếng Anh</h1><p>Bảng chữ cái tiếng Anh bao gồm 26 chữ cái: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.</p><p>Mỗi chữ cái có một cách phát âm riêng. Dưới đây là cách phát âm của từng chữ cái:</p><ul><li>A: /eɪ/</li><li>B: /biː/</li><li>C: /siː/</li><li>D: /diː/</li><li>E: /iː/</li><li>F: /ɛf/</li><li>G: /dʒiː/</li><li>H: /eɪtʃ/</li><li>I: /aɪ/</li><li>J: /dʒeɪ/</li><li>K: /keɪ/</li><li>L: /ɛl/</li><li>M: /ɛm/</li><li>N: /ɛn/</li><li>O: /oʊ/</li><li>P: /piː/</li><li>Q: /kjuː/</li><li>R: /ɑːr/</li><li>S: /ɛs/</li><li>T: /tiː/</li><li>U: /juː/</li><li>V: /viː/</li><li>W: /ˈdʌbəl.juː/</li><li>X: /ɛks/</li><li>Y: /waɪ/</li><li>Z: /zɛd/</li></ul>"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q1", "question": "Chữ cái nào có cách phát âm là /biː/?", "correctAnswer": "B", "wrongAnswer": ["A", "C"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q2", "question": "Chữ cái nào có cách phát âm là /dʒiː/?", "correctAnswer": "G", "wrongAnswer": ["H", "J"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q3", "question": "Chữ cái nào có cách phát âm là /ɛl/?", "correctAnswer": "L", "wrongAnswer": ["I", "K"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q4", "question": "Chữ cái nào có cách phát âm là /ɛn/?", "correctAnswer": "N", "wrongAnswer": ["M", "O"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q5", "question": "Chữ cái nào có cách phát âm là /oʊ/?", "correctAnswer": "O", "wrongAnswer": ["P", "Q"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q6", "question": "Chữ cái nào có cách phát âm là /piː/?", "correctAnswer": "P", "wrongAnswer": ["Q", "R"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q7", "question": "Chữ cái nào có cách phát âm là /ɛs/?", "correctAnswer": "S", "wrongAnswer": ["T", "U"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q8", "question": "Chữ cái nào có cách phát âm là /viː/?", "correctAnswer": "V", "wrongAnswer": ["W", "X"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q9", "question": "Chữ cái nào có cách phát âm là /waɪ/?", "correctAnswer": "Y", "wrongAnswer": ["X", "Z"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q10", "question": "Chữ cái nào có cách phát âm là /zɛd/?", "correctAnswer": "Z", "wrongAnswer": ["Y", "W"]}}], "vocabularies": [{"en": "alphabet", "vi": "bảng chữ cái", "enPronunciation": "/ˈæl.fə.bɛt/"}, {"en": "letter", "vi": "chữ cái", "enPronunciation": "/ˈlet.ər/"}, {"en": "pronunciation", "vi": "phát âm", "enPronunciation": "/prəˌnʌn.siˈeɪ.ʃən/"}]}\n\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `Section: "${section}", chủ đề lesson: "${lesson}"`,
          },
        ],
      },
    ],
  })

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE")

  console.log("result", result)
  return NextResponse.json({
    data: result.response.candidates?.[0].content.parts[0].text,
  })
}
