'use client'

import { Select, SelectProps } from 'antd'

interface IProps extends SelectProps {
  onEnter?: () => void
}

export const AppSelect = ({
  onEnter,
  size = "large",
  className = "",
  ...props
}: IProps) => {
  return (
    <Select
      className={`rounded-2xl! ${className}`}
      placeholder={"Please select"}
        size={size}
      {...props}
    />
  )
}
