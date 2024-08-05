import { Input } from 'antd'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { HelperBox } from './HelperBox'
import { TranslationService } from '@/service/translation/index.service'
import { LanguageEnum, LanguageNameMapping, LanguageVoiceMapping } from '@/types/language'
import { AppButton } from '@/components/level1/antd/AppButton'
import { set } from 'lodash'
import { AppSpin } from '@/components/level1/antd/AppSpin'
import { SpeakerService } from '@/service/speaker'
import Image from 'next/image'

let lastTranslatedText = ''

export const Translation: FC = () => {
  const [text, setText] = useState('')
  const [textTranslated, setTextTranslated] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState<LanguageEnum>(LanguageEnum.EN)
  const [targetLanguage, setTargetLanguage] = useState<LanguageEnum>(LanguageEnum.VI)
  const [isTranslating, setIsTranslating] = useState(false)
  const inputRef = useRef<any>(null)

  const swapLanguage = () => {
    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)
    setText('')
    setTextTranslated('')
    lastTranslatedText=''
    inputRef.current.focus()
  }

  const startTranslate = useCallback(() => {
    if (lastTranslatedText === text.trim()) return
    if (isTranslating) return

    setIsTranslating(true)
    TranslationService.translate(text.trim(), sourceLanguage, targetLanguage)
      .then((data) => {
        setTextTranslated(data)
        lastTranslatedText = text.trim()
      })
      .finally(() => {
        setIsTranslating(false)
      })
  }, [isTranslating, sourceLanguage, targetLanguage, text])

  useEffect(() => {
    if (!text.trim()) {
      setTextTranslated('')
      return
    }
  }, [sourceLanguage, startTranslate, targetLanguage, text])

  return (
    <HelperBox
      image="https://img.icons8.com/fluency/28/google-translate-new-logo.png"
      title="Dịch"
    >
      <div className="grid gap-3">
        <div>
          <div className="flex justify-between text-blue-500">
            <span>
              <span className="text-gray-600">
                {LanguageNameMapping[sourceLanguage]}
              </span>{" "}
              <span
                className="cursor-pointer inline-block mt-1 text-blue-500"
                onClick={() => {
                  SpeakerService.speakFree(
                    text.trim(),
                    LanguageVoiceMapping[sourceLanguage]
                  )
                }}
              >
                <i className="fa-solid fa-volume"></i>
              </span>
            </span>
          </div>

          <Input.TextArea
            ref={inputRef}
            autoSize
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            className="!min-h-[72px] mt-1 !px-0 no-padding"
            placeholder="Nhập văn bản và nhấn Enter để dịch"
            rows={3}
            bordered={false}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                e.stopPropagation()
                startTranslate()
              }
            }}
          />
        </div>

        <div className="relative mt-4">
          <AppButton
            className="cursor-pointer absolute bg-blue-500 text-white !w-[36px] !h-[36px] flex items-center justify-center !p-0 !rounded-full top-[-28px] left-[45%]"
            onClick={swapLanguage}
          >
            <i className="fa-regular fa-arrow-up-arrow-down"></i>
          </AppButton>

          <span>
            <span className="text-gray-600">
              {LanguageNameMapping[targetLanguage]}
            </span>{" "}
            <span
              className="cursor-pointer inline-block mt-1 text-blue-500"
              onClick={() => {
                SpeakerService.speakFree(
                  textTranslated.trim(),
                  LanguageVoiceMapping[targetLanguage]
                )
              }}
            >
              <i className="fa-solid fa-volume"></i>
            </span>
          </span>

          <div className="min-h-[72px] bg-[rgb(248, 249, 250)] w-full  rounded-md pt-1">
            {isTranslating ? <AppSpin /> : textTranslated}
          </div>
        </div>
      </div>
    </HelperBox>
  )
}
