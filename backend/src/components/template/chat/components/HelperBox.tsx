import { Alert } from 'antd'
import Image from 'next/image'
import { FC, ReactNode } from 'react'

export const HelperBox: FC<{
  image: string
  title: string
  children: ReactNode
  action?: ReactNode
  alert?: string
}> = ({ image, title, alert, children, action }) => {
  return (
    <div className="p-4 rounded-md bg-white w-[380px] h-fit shadow-md">
      <div className="flex items-center gap-2">
        <Image width="28" height="28" src={image} alt="microsoft-tips" />
        <div className="flex-grow font-bold flex justify-between items-center">
          {title}
          {action}
        </div>
      </div>

      <div className="p-4 rounded-md border mt-3 bg-[#edeff829]">{children}</div>
      {alert && <Alert className="mt-3" message={alert} type="info" showIcon closable />}
    </div>
  )
}
