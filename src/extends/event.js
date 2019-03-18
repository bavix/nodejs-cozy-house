import Referrer from 'referer-parser'
import get from 'lodash/get'
import common from '../defaults/common'
import request from '../defaults/request'
import visitor from '../defaults/visitor'
import event from '../defaults/event'

const defaults = (events, meta) => {
  const dataCommon = common(meta)
  const dataRequest = request(meta)
  const dataVisitor = visitor(meta)
  const dataEvent = event(meta)

  for (const key in events) {
    if (events.hasOwnProperty(key)) {
      events[key] = {
        ...dataCommon,
        ...events[key]
      }
      events[key].request = {
        ...dataRequest,
        ...(events[key].request || {})
      }
      events[key].visitor = {
        ...dataVisitor,
        ...(events[key].visitor || {})
      }
      events[key].event = {
        ...dataEvent,
        ...(events[key].event || {})
      }
    }
  }
}

const modifyReferrer = (events, meta) => {
  for (const data of events) {
    const ref = new Referrer(meta.referer || '', get(data, 'request.url', null))

    data.referrer = {
      know: Boolean(ref.known),
      name: ref.referer || null,
      medium: ref.medium === 'unknown' ? null : ref.medium,
      searchParameter: ref.search_parameter || null,
      searchTerm: ref.search_term || null,
      uri: ref.uri.href || null
    }
  }
}

export default (data, meta) => {
  defaults(data, meta)
  modifyReferrer(data, meta)
  return data
}
