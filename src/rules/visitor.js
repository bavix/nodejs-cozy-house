export default {
  userId: {
    type: Number
  },
  uuid: {
    type: String,
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
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
