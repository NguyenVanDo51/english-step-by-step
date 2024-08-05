import { AudioPlayer } from "@/components/level1/AudioPlayer"
import { AppButton } from "@/components/level1/antd/AppButton"
import { scrollToBottom, ScrollSelecter } from "@/libs/helpers/dom"
import { speak } from "@/libs/helpers/speech"
import { SpeakerService } from "@/service/speaker"
import { IMessage } from "@/types/chat"
import { Tooltip } from "antd"
import { memo, useState, useEffect } from "react"
import { MessageProps } from "."
import { Avatar } from "@/components/displayers/Avatar"
import { ISetting } from "@/types/setting"

interface LeftMessageProps extends MessageProps {
  avatar: string | undefined
  message: IMessage
  isLastItem: boolean
  inputType: ISetting["inputType"]
}

export const LeftMessage = memo(function LeftMessage({
  avatar,
  message,
  inputType,
  isLastItem,
}: LeftMessageProps) {
  const { content } = message
  const [type, setType] = useState(inputType)

  const onChangeType = () => {
    setType(type === "text" ? "voice" : "text")
    SpeakerService.cancel()
    if (isLastItem) {
      scrollToBottom(ScrollSelecter.Message)
    }
  }

  useEffect(() => {
    setType(inputType)
  }, [inputType])

  return (
    <>
      <div className="col-start-1 col-end-12 p-1 message-item" id={message.id}>
        <div className="flex gap-2 lg:gap-3 flex-row items-center">
          <Avatar src={avatar as string} size={34} />

          <div className="bg-zinc-100 dark:bg-slate-700 py-1 px-4  rounded-lg max-w-full overflow-hidden whitespace-break-spaces">
            {type === "voice" ? (
              <AudioPlayer text={content} />
            ) : (
              <div className="py-1">{content}</div>
            )}
          </div>

          <div className="message-actions flex items-center gap-2">
            {type === "text" && (
              <AppButton
                onClick={() => speak(content)}
                size="small"
                type="link"
                icon={<i className="fa-solid fa-volume-low"></i>}
              />
            )}

            <Tooltip title={type === "text" ? "Text" : "Audio"}>
              <AppButton
                onClick={onChangeType}
                type="link"
                size="small"
                danger={false}
                icon={<i className="fa-solid fa-arrows-rotate"></i>}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  )
})
