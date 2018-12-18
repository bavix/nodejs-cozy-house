import consumer from 'consumer'

export default {
  ...consumer,
  hostname: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  }
}
