import Schema from 'validate'
import visitor from './visitor'
import request from './request'
import event from './event'

export default {
  target: {
    type: String
  },
  googleClientId: {
    type: String
  },
  gclid: {
    type: String
  },
  ym_client_id: {
    type: String
  },
  ymclid: {
    type: String
  },
  yclid: {
    type: String
  },
  pageLoadTime: {
    type: Number
  },
  sessionId: {
    type: String
  },
  event: new Schema(event),
  visitor: new Schema(visitor),
  request: new Schema(request)
}
