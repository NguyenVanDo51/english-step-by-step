import { FC, useContext, useReducer, useState } from 'react'
import { HelperBox } from './HelperBox'
import { ChatContext } from '../context'
import { AppButton } from '@/components/level1/antd/AppButton'
import { ChatService } from '../service'
import { AppSpin } from '@/components/level1/antd/AppSpin'
import { SpeakerService } from '@/service/speaker'

let lastMessage: string | undefined = ''

export const Suggestions: FC = () => {
  const { messages, lesson } = useContext(ChatContext)
  const [suggestion, setSuggestion] = useState<string>('')
  const [isGetting, setIsGetting] = useState(false)

  const getSuggestion = () => {
    if (lastMessage === messages.at(-1)?.content) return

    setIsGetting(true)
    setSuggestion('')
    ChatService.getSuggestion(lesson!, messages)
      .then((res) => {
        lastMessage = messages.at(-1)?.content
        setSuggestion(res.data)
      })
      .finally(() => {
        setIsGetting(false)
      })
  }

  return (
    <HelperBox
      image="https://img.icons8.com/fluency/28/microsoft-tips.png"
      title="Gợi ý"
      action={
        <AppButton type="link" onClick={getSuggestion} disabled={isGetting}>
          <i className="fa-solid fa-arrows-rotate"></i>
        </AppButton>
      }
    >
      {isGetting && <AppSpin className="mr-2" />}

      {suggestion && (
        <span>
          <span
            className="cursor-pointer inline-block mr-2 text-blue-500"
            onClick={() => {
              SpeakerService.speakFree(suggestion)
            }}
          >
            <i className="fa-solid fa-volume"></i>
          </span>

          {suggestion}
        </span>
      )}
      {!suggestion && !isGetting && (
        <span>
          Nếu thấy khó khăn, hãy{' '}
          <span className="text-blue-500 underline cursor-pointer" onClick={getSuggestion}>
            nhận gợi ý
          </span>{' '}
          nhé!
        </span>
      )}
    </HelperBox>
  )
}
