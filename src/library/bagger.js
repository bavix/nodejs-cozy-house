export default {
  pack(ctx) {
    return JSON.stringify(ctx.request.body)
  },
  unpack(pack) {
    return JSON.parse(pack)
  }
}
