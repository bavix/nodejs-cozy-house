import mc from './low-memcached'

export default {
  get(key) {
    return mc.get(key)
  },
  set(key, val) {
    return mc.set(key, val, mc.ttl)
  }
}
