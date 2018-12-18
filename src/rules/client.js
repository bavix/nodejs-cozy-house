import Visitor from './visitor'
import Event from './event'

export default {
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
  event: {
    type: Event,
    required: true
  },
  visitor: {
    type: Visitor,
    required: true
  }
}
