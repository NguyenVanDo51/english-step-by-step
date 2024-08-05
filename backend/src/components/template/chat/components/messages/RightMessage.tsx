import { AppButton, AppDeleteButton } from "@/components/level1/antd/AppButton"
import { SpeakerService } from "@/service/speaker"
import { IMessage } from "@/types/chat"
import { memo, useState } from "react"
import { MessageProps } from "."
import { Divider } from "antd"
import { AppSpin } from "@/components/level1/antd/AppSpin"
import { ChatService } from "../../service"
import { SendMessageBody } from "../../service/request"

interface RightMessageProps extends MessageProps {
  message: IMessage
  avatar: string | null | undefined
  reStart: () => void
}

export const RightMessage = memo(function RightMessage({
  message,
  reStart,
  reSend,
}: RightMessageProps) {
  const [comment, setComment] = useState()
  const [isGetComment, setIsGetComment] = useState<boolean>(false)
  const [openComment, setOpenComment] = useState<boolean>(false)

  const getComment = () => {
    if (isGetComment) return

    setOpenComment(!openComment)

    if (comment) {
      return
    }
    const bodyMessage: SendMessageBody[] = [
      {
        role: "user",
        content: message.content,
      },
    ]
    setIsGetComment(true)

    ChatService.checkGrammar(bodyMessage)
      .then((res) => {
        const result = res.data
        setComment(result)
      })
      .finally(() => {
        setIsGetComment(false)
      })
  }

  const renderCommentIcon = () => {
    if (isGetComment) {
      return <AppSpin size="small" />
    }

    if (!isGetComment && openComment && comment) {
      return <i className="fa-regular fa-chevron-up"></i>
    }

    return <i className="fa-regular fa-chart-mixed"></i>
  }

  return (
    <div className="col-start-4 col-end-13 p-1 message-item" id={message.id}>
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="relative flex  flex-col items-end ml-2 bg-indigo-100 rounded-lg dark:bg-dark-primary py-2">
          <div className="px-4">{message.content}</div>

          {comment && openComment && (
            <>
              <Divider className="my-2 !border-indigo-200" />
              <div className=" text-gray-800 italic px-4 whitespace-break-spaces">
                {comment}
              </div>
            </>
          )}
        </div>

        <span className=" cursor-pointer p-2" onClick={getComment}>
          {renderCommentIcon()}
        </span>

        {message.status === "error" ? (
          <AppButton
            onClick={reSend}
            type="link"
            size="small"
            danger
            icon={<i className="fa-solid fa-rotate-left m-0"></i>}
          >
            Failed
          </AppButton>
        ) : (
          <div className="message-actions flex items-center gap-2">
            <AppDeleteButton onConfirm={reStart} title="Delete" type="link" />

            {message.recorded && (
              <AppButton
                onClick={() => {
                  SpeakerService.cancel()
                  new Audio(message.recorded).play()
                }}
                size="small"
                type="link"
                icon={<i className="fa-solid fa-volume-low"></i>}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
})
