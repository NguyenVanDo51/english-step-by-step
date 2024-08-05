import { IMessage } from '@/types/chat'

export type SendMessageBody = Pick<IMessage, 'role' | 'content'>
