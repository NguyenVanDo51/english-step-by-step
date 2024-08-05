'use client'

import { FC } from 'react'
import { ConfigProvider, Modal, ModalFuncProps, ModalProps } from 'antd'
import { darkTheme } from '@/theme/themeConfig'
import clsx from "clsx"
import { css } from "@emotion/css"

export interface AppModalProps extends ModalProps {
  children: React.ReactNode
}

export const AppModal: FC<AppModalProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Modal
      centered
      {...props}
      className={css({
        ".ant-modal-title": {
          fontWeight: 500,
        },
      })}
    >
      {children}
    </Modal>
  )
}

export class ModalConfirm {
  static confirm({ ...args }: ModalFuncProps) {
    Modal.confirm({
      centered: true,
      title: 'Sign out',
      content: 'Are you sure?',
      ...args,
    })
  }
}

export class ModalInfo {
  static info({ ...args }: ModalFuncProps) {
    Modal.info({
      centered: true,
      ...args,
    })
  }
}

export class ModalSuccess {
  static show({ ...args }: ModalFuncProps) {
    Modal.success({
      centered: true,
      ...args,
    })
  }
}