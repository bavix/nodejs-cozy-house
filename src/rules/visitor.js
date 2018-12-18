export default {
  userId: {
    type: String
  },
  uuid: {
    type: String
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
