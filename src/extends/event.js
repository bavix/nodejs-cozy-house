import defaults from './defaults'
import referrer from './referrer'

export default (data, meta) => {
  defaults(data, meta)
  referrer(data, meta)
  return data
}
