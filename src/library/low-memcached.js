import { promisify } from 'util'
import Memcached from 'memcached'
import env from './env'

const mc = new Memcached(['127.0.0.1:11211'], {
  timeout: 50,
  retries: 0,
  failures: 0,
  retry: 0
})

const memcachedGet = promisify(mc.get).bind(mc)
const memcachedSet = promisify(mc.set).bind(mc)

export default {
  get: memcachedGet,
  set: memcachedSet,
  ttl: env.get('CACHE_TTL', 120)
}
