import dispatch from '../library/dispatch'
import { env } from '../library/env'
import bugger from '../library/bagger'

/**
 * Adding an event to the queue
 *
 * @param ctx
 */
export default ctx => {
  const workload = {
    data: ctx.request.body,
    meta: {
      ajax: ctx.request.get('X-Requested-With') === 'XMLHttpRequest',
      userAgent: ctx.get('user-agent'),
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
