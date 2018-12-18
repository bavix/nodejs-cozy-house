export default {
  device: {
    type: String,
    required: true,
    enum: ['server', 'browser', 'ios', 'android']
  },
  category: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  value: {
    type: Number
  },
  json: {
    type: String
  }
}
