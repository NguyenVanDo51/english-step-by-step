import React, { useContext, useState } from "react"
import { Button, Drawer, DrawerProps, Modal } from "antd"
import { ChatContext } from "../context"
import { BotProfile } from "./BotProfile"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { AppButton } from "@/components/level1/antd/AppButton"
import { css } from "@emotion/css"

type Props = DrawerProps & {}

export const ChatInfo: React.FC<Props> = ({ ...props }) => {
  const { lesson } = useContext(ChatContext)
  const { user } = useUser()
  const router = useRouter()

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          // sau khi xoá thành công thì chuyển hướng về trang chủ dùng router.push
          router.push("/")
        } catch (error) {
          console.log("Error deleting data:", error)
        }
      },
      onCancel() {
        console.log("Cancel")
      },
    })
  }

  return (
    <>
      <Drawer
        title="Situation Details"
        className={css({
          ".ant-drawer-header": {
            padding: "8px 12px",
          },
        })}
        placement="right"
        {...props}
      >
        <div className="h-full">
          <div className="flex flex-col justify-between">
            <BotProfile bot={lesson} type={2} />
          </div>
          <div>
            <span className="text-lg font-bold">Bot Instruction</span>
            <p className="pt-3">{lesson?.assistantInstruction}</p>
          </div>
        </div>
      </Drawer>
    </>
  )
}
