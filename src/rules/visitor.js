import { REGEX_UUID } from '../consts'

export default {
  userId: {
    type: Number
  },
  uuid: {
    type: String,
    match: REGEX_UUID,
    message: {
      match: path => `${path} must be of type UUID.`
    }
  },
  browserWidth: {
    type: Number
  },
  browserHeight: {
    type: Number
  },
  deviceWidth: {
    type: Number
  },
  deviceHeight: {
    type: Number
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet']
  },
  deviceOrientation: {
    type: String,
    enum: ['landscape', 'portrait']
  }
}
