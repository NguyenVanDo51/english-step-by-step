import { NextResponse } from "next/server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY as string
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
  Xây dựng nội dung cho ứng dụng học tiếng anh theo lộ trình từ đầu:
- Đối tượng người dùng: Người việt nam muốn học tiếng anh giao tiếp.
- Ứng dụng bao gồm nhiều section, mỗi section sẽ có nhiều bài học (lesson). 
- Một bài học sẽ về 1 chủ đề nằm trong 1 section.
- Một bài học sẽ bao gồm các phần nội dung lý thuyết và các câu hỏi trắc nghiệm để kiểm tra kiến thức.
- Mỗi bài học sẽ có khoảng 10 đến 20 bài tập, chủ động tạo ra các bài tập để ứng dụng và hiểu phần lý thuyết.
- Một bài học sẽ bắt đầu với 1 phần lý thuyết với kiểu dữ liệu là HTML_PAGE, còn lại là bài tập với kiểu là PICK_CORRECT_ANSWER.
- Phần lý thuyết và câu hỏi trong phần bài tập ở ngôn ngữ tiếng việt.

Interface Data Structure:

export type LessonHTMLDataType = {
  id: string;
  content: string[]; // html - Chưa 1 hoặc nhiều trang HTML ví dụ: ["<div><h2>Chủ ngữ</h2><p>Chủ ngữ là thành phần chính của câu, xác định ai hoặc cái gì thực hiện hành động. Hãy cùng tìm hiểu sâu hơn về chủ ngữ qua bài học này.</p></div"]
}

export type LessonPickCorrectAnswerDataType = {
  id: string;
  question: string; // html
  correctAnswer: string;
  wrongAnswer: string[];
  explanation?: string // html | markdown
}

export enum LessonPartType {
  HTML_PAGE = 'HTML_PAGE', // nội dung lý thuyết 
  PICK_CORRECT_ANSWER = 'PICK_CORRECT_ANSWER', // câu hỏi trắc nghiệm liên quan đến lý thuyết
}

export type LessonPart<T = any> = {
  id: string;
  order: number;
  type: LessonPartType;
  data?: T; // nếu type là HTML_PAGE thì data là LessonHTMLDataType, ...
}

export type Vocabulary = {
  en: string;
  vi: string;
  enPronunciation: string;
}

export type Lesson = {
  id: string;
  sectionId: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  lessonPart: LessonPart[];
  vocabularies?: Vocabulary[];
}

Nhiệm vụ:
- Tiếp tục tạo thêm các bài học cho các section khác nhau theo cấu trúc tương tự để xây dựng lộ trình học đầy đủ.

Ví dụ:
- User: Section: "Tiếng anh nền tảng", chủ đề bài học: "Bảng chữ cái", Mô tả bài học: "Tìm hiểu khái niệm chủ chữ, xem ví dụ và làm bài tập thú vị để hiểu về chủ ngữ"
- Response: {
    "shortDescription": "Tìm hiểu khái niệm chủ chữ, xem ví dụ và làm bài tập thú vị để hiểu về chủ ngữ",
    "longDescription": "",
    "lessonPart": [
        {
            "id": "lý-thuyết-chủ-ngữ",
            "order": 1,
            "type": "HTML_PAGE",
            "data": {
                "id": "lý-thuyết-chủ-ngữ",
                "content": [
                    "<div><h2>Chủ ngữ</h2><p>Chủ ngữ là thành phần chính của câu, xác định ai hoặc cái gì thực hiện hành động. Hãy cùng tìm hiểu sâu hơn về chủ ngữ qua bài học này.</p><p>Ví dụ:</p><ul><li><b>The cat</b> is sleeping. (Con mèo đang ngủ)</li><li><b>My father</b> works in a bank. (Bố tôi làm việc trong ngân hàng)</li><li><b>The sun</b> shines brightly. (Mặt trời chiếu sáng rực rỡ)</li></ul><p>Trong các ví dụ trên, <b>The cat</b>, <b>My father</b> và <b>The sun</b> đều là chủ ngữ, chúng xác định ai hoặc cái gì thực hiện hành động.</p></div>"
                ]
            }
        },
        {
            "id": "bài-tập-1-chủ-ngữ",
            "order": 2,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-1-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The dog barks loudly\" là gì?",
                "correctAnswer": "The dog",
                "wrongAnswer": [
                    "barks",
                    "loudly"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The dog\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-2-chủ-ngữ",
            "order": 3,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-2-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"My sister is reading a book\" là gì?",
                "correctAnswer": "My sister",
                "wrongAnswer": [
                    "is reading",
                    "a book"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"My sister\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-3-chủ-ngữ",
            "order": 4,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-3-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The flowers are beautiful\" là gì?",
                "correctAnswer": "The flowers",
                "wrongAnswer": [
                    "are",
                    "beautiful"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The flowers\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-4-chủ-ngữ",
            "order": 5,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-4-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The birds are singing\" là gì?",
                "correctAnswer": "The birds",
                "wrongAnswer": [
                    "are",
                    "singing"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The birds\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-5-chủ-ngữ",
            "order": 6,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-5-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The children are playing in the park\" là gì?",
                "correctAnswer": "The children",
                "wrongAnswer": [
                    "are playing",
                    "in the park"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The children\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-6-chủ-ngữ",
            "order": 7,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-6-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The boy is eating a sandwich\" là gì?",
                "correctAnswer": "The boy",
                "wrongAnswer": [
                    "is eating",
                    "a sandwich"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The boy\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-7-chủ-ngữ",
            "order": 8,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-7-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The girl is writing a letter\" là gì?",
                "correctAnswer": "The girl",
                "wrongAnswer": [
                    "is writing",
                    "a letter"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The girl\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-8-chủ-ngữ",
            "order": 9,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-8-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The man is driving a car\" là gì?",
                "correctAnswer": "The man",
                "wrongAnswer": [
                    "is driving",
                    "a car"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The man\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-9-chủ-ngữ",
            "order": 10,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-9-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The woman is cooking dinner\" là gì?",
                "correctAnswer": "The woman",
                "wrongAnswer": [
                    "is cooking",
                    "dinner"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The woman\" là chủ ngữ."
            }
        },
        {
            "id": "bài-tập-10-chủ-ngữ",
            "order": 11,
            "type": "PICK_CORRECT_ANSWER",
            "data": {
                "id": "bài-tập-10-chủ-ngữ",
                "question": "Chủ ngữ trong câu \"The cat is playing with a ball\" là gì?",
                "correctAnswer": "The cat",
                "wrongAnswer": [
                    "is playing",
                    "with a ball"
                ],
                "explanation": "Chủ ngữ là phần xác định ai hoặc cái gì thực hiện hành động, trong câu này \"The cat\" là chủ ngữ."
            }
        }
    ],
    "vocabularies": [
        {
            "en": "subject",
            "vi": "chủ ngữ",
            "enPronunciation": "/ˈsʌb.dʒekt/"
        },
        {
            "en": "verb",
            "vi": "động từ",
            "enPronunciation": "/vɜːrb/"
        },
        {
            "en": "object",
            "vi": "tân ngữ",
            "enPronunciation": "/ˈɒb.dʒekt/"
        },
        {
            "en": "sentence",
            "vi": "câu",
            "enPronunciation": "/ˈsen.təns/"
        },
        {
            "en": "action",
            "vi": "hành động",
            "enPronunciation": "/ˈæk.ʃən/"
        }
    ]
}
  `,
})

const generationConfig = {
  temperature: 2,
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
  const shortDescription = searchParams.get("shortDescription")?.trim() ?? ""

  if (!section || !lesson) {
    return new Response("Invalid", {
      status: 500,
    })
  }

  const chatSession = model.startChat({
    generationConfig,

    history: [
      // {
      //   role: "user",
      //   parts: [
      //     {
      //       text: 'Section: "Tiếng anh nền tảng", chủ đề lesson: "Bảng chữ cái"',
      //     },
      //   ],
      // },
      // {
      //   role: "model",
      //   parts: [
      //     {
      //       text: '```json\n{"id": "lesson-1", "sectionId": "alphabet-section", "title": "Bài 1: Học bảng chữ cái", "shortDescription": "Giới thiệu về bảng chữ cái và cách phát âm.", "longDescription": "Trong bài học này, bạn sẽ học về bảng chữ cái tiếng Anh, cách phát âm từng chữ cái và một số từ vựng cơ bản liên quan. Bạn sẽ cần hoàn thành các bài tập để kiểm tra kiến thức của mình.", "lessonPart": [{"type": "HTML_PAGE", "data": {"id": "html-page-1", "content": ["<h1>Bảng Chữ Cái Tiếng Anh</h1><p>Bảng chữ cái tiếng Anh bao gồm 26 chữ cái: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.</p><p>Mỗi chữ cái có một cách phát âm riêng. Dưới đây là cách phát âm của từng chữ cái:</p><ul><li>A: /eɪ/</li><li>B: /biː/</li><li>C: /siː/</li><li>D: /diː/</li><li>E: /iː/</li><li>F: /ɛf/</li><li>G: /dʒiː/</li><li>H: /eɪtʃ/</li><li>I: /aɪ/</li><li>J: /dʒeɪ/</li><li>K: /keɪ/</li><li>L: /ɛl/</li><li>M: /ɛm/</li><li>N: /ɛn/</li><li>O: /oʊ/</li><li>P: /piː/</li><li>Q: /kjuː/</li><li>R: /ɑːr/</li><li>S: /ɛs/</li><li>T: /tiː/</li><li>U: /juː/</li><li>V: /viː/</li><li>W: /ˈdʌbəl.juː/</li><li>X: /ɛks/</li><li>Y: /waɪ/</li><li>Z: /zɛd/</li></ul>"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q1", "question": "Chữ cái nào có cách phát âm là /biː/?", "correctAnswer": "B", "wrongAnswer": ["A", "C"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q2", "question": "Chữ cái nào có cách phát âm là /dʒiː/?", "correctAnswer": "G", "wrongAnswer": ["H", "J"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q3", "question": "Chữ cái nào có cách phát âm là /ɛl/?", "correctAnswer": "L", "wrongAnswer": ["I", "K"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q4", "question": "Chữ cái nào có cách phát âm là /ɛn/?", "correctAnswer": "N", "wrongAnswer": ["M", "O"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q5", "question": "Chữ cái nào có cách phát âm là /oʊ/?", "correctAnswer": "O", "wrongAnswer": ["P", "Q"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q6", "question": "Chữ cái nào có cách phát âm là /piː/?", "correctAnswer": "P", "wrongAnswer": ["Q", "R"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q7", "question": "Chữ cái nào có cách phát âm là /ɛs/?", "correctAnswer": "S", "wrongAnswer": ["T", "U"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q8", "question": "Chữ cái nào có cách phát âm là /viː/?", "correctAnswer": "V", "wrongAnswer": ["W", "X"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q9", "question": "Chữ cái nào có cách phát âm là /waɪ/?", "correctAnswer": "Y", "wrongAnswer": ["X", "Z"]}}, {"type": "PICK_CORRECT_ANSWER", "data": {"id": "q10", "question": "Chữ cái nào có cách phát âm là /zɛd/?", "correctAnswer": "Z", "wrongAnswer": ["Y", "W"]}}], "vocabularies": [{"en": "alphabet", "vi": "bảng chữ cái", "enPronunciation": "/ˈæl.fə.bɛt/"}, {"en": "letter", "vi": "chữ cái", "enPronunciation": "/ˈlet.ər/"}, {"en": "pronunciation", "vi": "phát âm", "enPronunciation": "/prəˌnʌn.siˈeɪ.ʃən/"}]}\n\n```',
      //     },
      //   ],
      // },
    ],
  })

  const result = await chatSession.sendMessage(
    `Section: "${section}", chủ đề bài học: "${lesson}", Mô tả bài học: "${shortDescription}"`
  )

  console.log("result", result)
  return NextResponse.json({
    data: result.response.candidates?.[0]?.content.parts[0].text,
  })
}
