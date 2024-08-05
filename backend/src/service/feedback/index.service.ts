import { httpClient } from '../httpClient'
import { IPayloadSendFeedback } from './request'

export class FeedbackService {
  static send = (payload: IPayloadSendFeedback) => {
    return httpClient.post('/api/feedback', payload)
  }
}
