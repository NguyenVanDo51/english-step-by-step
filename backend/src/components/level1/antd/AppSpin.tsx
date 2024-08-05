import { Spin, SpinProps } from 'antd'
import { FC, ReactNode } from 'react'

export const AppSpin: FC<SpinProps & { children?: ReactNode }> = ({ children, ...props }) => {
  return <Spin {...props}>{children}</Spin>
}
