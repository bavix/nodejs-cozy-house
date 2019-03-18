import dispatch from '../library/dispatch'
import { env } from '../library/env'
import bugger from '../library/bagger'
import moment from 'moment'

/**
 * Adding an event to the queue
 *
 * @param ctx
 */
export default ctx => {
  const now = moment().now()
  const createdDate = now.format('YYYY-MM-DD')
  const createdTime = now.format('YYYY-MM-DD H:mm:ss')

  const workload = {
    data: ctx.request.body,
    meta: {
      createdDate,
      createdTime,
      ajax: ctx.request.get('X-Requested-With') === 'XMLHttpRequest',
      userAgent: ctx.get('user-agent'),
      referer: ctx.get('Referer'),
      secure: ctx.secure,
      ip: ctx.ip
    }
  }

  return dispatch(env.QUEUE_ENQUEUE, bugger.pack(workload))
    .then(() => {
      ctx.status = 202
      ctx.body = {
        message: 'Accepted'
      }
    })
    .catch(() => {
      ctx.throw(504)
    })
}
