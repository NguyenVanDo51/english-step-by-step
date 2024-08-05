import { PRIMARY_COLOR } from "@/libs/appConfig"
import { Tooltip, TooltipProps } from "antd"
import clsx from "clsx"
import { ReactNode, FC } from "react"

type IProps = TooltipProps & {
  children: ReactNode
}
export const AppTooltip: FC<IProps> = ({
  children,
  rootClassName,
  ...props
}) => {
  return (
    <Tooltip rootClassName={clsx(rootClassName, "max-w-2xl")} {...props}>
      {children}
    </Tooltip>
  )
}
