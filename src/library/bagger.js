export default {
  pack(unpack) {
    return JSON.stringify(unpack)
  },
  unpack(pack) {
    return JSON.parse(pack)
  }
}
