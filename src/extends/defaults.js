import common from '../defaults/common'
import request from '../defaults/request'
import visitor from '../defaults/visitor'
import event from '../defaults/event'
import has from 'lodash/has'

export default (events, meta) => {
  const dataCommon = common(meta)
  const dataRequest = request(meta)
  const dataVisitor = visitor(meta)
  const dataEvent = event(meta)

  for (const key in events) {
    if (has(events, key)) {
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
        ...events[key].event
      }
    }
  }
}
