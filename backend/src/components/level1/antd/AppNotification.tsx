import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification/interface'

interface IArgs extends ArgsProps {
  title?: string
}

export class AppNotifycation {
  static error = ({ message = 'Error', ...args }: ArgsProps) => {
    notification.error({
      message,
      key: String(message),
      ...args,
    })
  }

  static success = ({ title = 'Success', message, ...args }: IArgs) => {
    notification.success({
      message: title,
      description: message,
      key: String(message),
      ...args,
    })
  }
}
