import { useParams, useRouter } from "next/navigation"
import { FC, useContext, useState } from "react"
import { ChatContext } from "../context"
import { AppModal } from "@/components/level1/antd/AppModal"
import { SettingTemplate } from "../../settings/SettingTemplate"

interface IProps {}

export const Header: FC<IProps> = () => {
  const { openInfo } = useContext(ChatContext)
  const [openSettings, setOpenSettings] = useState<boolean>(false)

  const params = useParams()

  const router = useRouter()

  return (
    <div className="flex justify-between items-center px-6 border-b py-2">
      <span onClick={() => router.back()} className="cursor-pointer text-lg">
        <i className="fa-regular fa-arrow-left mr-1"></i>
      </span>

      <div className="flex">
        <span
          className="cursor-pointer text-lg mr-4"
          onClick={() => setOpenSettings(true)}
        >
          <i className="fa-regular fa-gear"></i>
        </span>

        <span onClick={openInfo} className="cursor-pointer text-lg">
          <i className="fa-regular fa-bars"></i>
        </span>
      </div>

      <AppModal
        open={openSettings}
        onCancel={() => setOpenSettings(false)}
        title="Settings"
        cancelButtonProps={{ className: "!hidden" }}
        onOk={() => setOpenSettings(false)}
        okText="Close"
      >
        <SettingTemplate />

        <div>
          <p className="font-medium text-base">Short cut: </p>
          <div className="text-gray-500">
            <p>Space: start/stop voice recording</p>
          </div>
        </div>
      </AppModal>
    </div>
  )
}
