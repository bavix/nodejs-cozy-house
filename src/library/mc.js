import mc from './low-mc'

export default {
  get(key) {
    return mc.get(key)
  },
  set(key, val) {
    return mc.set(key, val, mc.ttl)
  }
}
