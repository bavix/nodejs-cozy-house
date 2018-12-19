import { logger } from '../library/logger'
import moment from 'moment'
import Referrer from 'referer-parser'
import get from 'lodash/get'
import recipient from '../dict/recipient'

const modifyTime = ctx => {
  const now = moment()
  ctx.request.body.createdDate = now.format('YYYY-MM-DD')
  ctx.request.body.createdTime = now.format('YYYY-MM-DD H:mm:ss')
}

const modifyReferrer = ctx => {
  const ref = new Referrer(
    ctx.get('Referer') || '',
    get(ctx.request.body, 'request.url', null)
  )

  ctx.request.body.referrer = {
    know: Boolean(ref.known),
    name: ref.referer || null,
    medium: ref.medium === 'unknown' ? null : ref.medium,
    searchParameter: ref.search_parameter || null,
    searchTerm: ref.search_term || null,
    uri: ref.uri.href || null
  }
}

const modifyRecipient = ctx => {
  ctx.request.body.recipient = recipient(ctx)
}

/**
 * @return {Function}
 */
export default async (ctx, next) => {
  modifyTime(ctx)
  modifyReferrer(ctx)
  modifyRecipient(ctx)
  logger.debug(ctx.request.body)
  await next()
}
