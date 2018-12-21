import msgpack5 from 'msgpack5'

const msg = msgpack5()

export default {
  pack(ctx) {
    return msg.encode(ctx.request.body)
  },
  unpack(pack) {
    return msg.decode(pack)
  }
}
