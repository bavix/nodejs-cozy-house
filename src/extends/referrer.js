import Referrer from 'referer-parser'
import get from 'lodash/get'

export default (events, meta) => {
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
