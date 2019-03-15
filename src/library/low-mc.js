import { promisify } from 'util'
import Memcached from 'memcached'
import env from './env'

const mc = new Memcached(['127.0.0.1:11211'], {
  timeout: 50,
  minTimeout: 1,
  maxTimeout: 1000
})

const get = promisify(mc.get).bind(mc)
const set = promisify(mc.set).bind(mc)

export default {
  get,
  set,
  ttl: env.get('CACHE_TTL', 120)
}
