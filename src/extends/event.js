import moment from 'moment'
import Referrer from 'referer-parser'
import get from 'lodash/get'
import common from '../defaults/common'
import request from '../defaults/request'
import visitor from '../defaults/visitor'
import event from '../defaults/event'

const defaults = ctx => {
  const dataCommon = common(ctx)
  const dataRequest = request(ctx)
  const dataVisitor = visitor(ctx)
  const dataEvent = event(ctx)

  for (const key in ctx.request.body) {
    if (ctx.request.body.hasOwnProperty(key)) {
      ctx.request.body[key] = {
        ...dataCommon,
        ...ctx.request.body[key]
      }
      ctx.request.body[key].request = {
        ...dataRequest,
        ...(ctx.request.body[key].request || {})
      }
      ctx.request.body[key].visitor = {
        ...dataVisitor,
        ...(ctx.request.body[key].visitor || {})
      }
      ctx.request.body[key].event = {
        ...dataEvent,
        ...(ctx.request.body[key].event || {})
      }
    }
  }
}

const modifyTime = ctx => {
  const now = moment()
  const createdDate = now.format('YYYY-MM-DD')
  const createdTime = now.format('YYYY-MM-DD H:mm:ss')

  for (const data of ctx.request.body) {
    data.createdDate = createdDate
    data.createdTime = createdTime
  }
}

const modifyReferrer = ctx => {
  for (const data of ctx.request.body) {
    const ref = new Referrer(
      ctx.get('Referer') || '',
      get(data, 'request.url', null)
    )

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

export default (data, ctx) => {
  defaults(ctx)
  modifyTime(ctx)
  modifyReferrer(ctx)

  return data
}
