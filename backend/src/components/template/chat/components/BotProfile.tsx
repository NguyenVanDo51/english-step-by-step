import { ScenarioInterface } from "@/types/lesson/type"
import { FC, useContext } from "react"
import { ChatContext } from "../context"
import { Avatar } from "@/components/displayers/Avatar"
import { AppButton } from "@/components/level1/antd/AppButton"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

type Props = {
  bot: ScenarioInterface | undefined
  type?: 1 | 2
}
export const BotProfile: FC<Props> = ({
  bot = {} as ScenarioInterface,
  type = 1,
}) => {
  const { openInfo, newChat, lesson } = useContext(ChatContext)
  const { user } = useUser()

  return (
    <div className="bg-zinc-100 rounded-xl p-4 mt-1 mb-3">
      <div className="flex gap-3">
        <div onClick={openInfo} className="cursor-pointer">
          <Avatar
            alt="bot-image"
            src={bot?.botImage || "/bot_placeholder.png"}
          />
        </div>

        <div className="flex flex-col gap-0.5 justify-center">
          <p
            className="font-medium m-0 text-lg cursor-pointer"
            onClick={openInfo}
          >
            {bot?.name}
          </p>

          <span className="text-sm text-[#5d6565]">
            Operated by{" "}
            <span>
              <Avatar
                alt="bot-image"
                src={bot.author?.imageUrl}
                size={20}
                className="inline-block"
              />{" "}
              <span className="text-blue-400">{bot.author?.username}</span>
            </span>
          </span>
        </div>
      </div>
      {type === 2 && (
        <div className="grid grid-cols-[auto_80px] gap-2 mt-3">
          <AppButton onClick={newChat}>New Chat</AppButton>
          {lesson?.author?.username === user?.username ? (
            <Link href={`/edit/${lesson?.id}`}>
              <AppButton
                icon={<i className="fa-regular fa-pen-to-square"></i>}
                danger
                type="link"
              >
                Edit
              </AppButton>
            </Link>
          ) : null}
        </div>
      )}

      {/* {type === 1 && (
        <span className="mt-2 text-sm text-[#5d6565]">
          {bot.used ?? 1} monthly user{bot.used > 1 ? "s" : ""}
        </span>
      )} */}

      <div className="text-sm p-0 mt-2">{bot?.userInstruction}</div>
    </div>
  )
}
