'use client'

import { FC, ReactNode, useState } from 'react'
import { Button as AntButton, ButtonProps, Popconfirm } from 'antd'
import clsx from "clsx"

interface AppButtonProps extends ButtonProps {
  children?: React.ReactNode
}

export const AppButton: FC<AppButtonProps> = ({
  children,
  className,
  type = "primary",
  size = "middle",
  ...props
}) => {
  return (
    <AntButton
      type={type}
      size={size}
      {...props}
      className={clsx(className, "[&.ant-btn-sm]:text-xs")}
    >
      {children}
    </AntButton>
  )
}

export const DebouncedButton: FC<AppButtonProps> = ({ onClick, children, ...props }) => {
  const [clicked, setClicked] = useState(false)

  // Hàm debounce giới hạn việc click mỗi 300ms
  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    // Thực hiện thao tác khi nút được click
    onClick?.({} as any)
    setTimeout(() => {
      setClicked(false)
    }, 1000)
  }

  return (
    <AppButton onClick={handleClick} {...props}>
      {children}
    </AppButton>
  )
}

interface IProps extends AppButtonProps {
  title?: string
  description?: string
  children?: ReactNode
  onConfirm: () => void
}

export const AppDeleteButton: React.FC<IProps> = ({
  children,
  title = 'Confirm',
  description = 'Are you sure to delete this?',
  onConfirm,
  ...props
}) => {
  return (
    <Popconfirm title={title} description={description} onConfirm={onConfirm} okText="Yes" cancelText="No">
      <AppButton danger size="small" icon={<i className="fa-solid fa-trash"></i>} {...props}>
        {children}
      </AppButton>
    </Popconfirm>
  )
}
