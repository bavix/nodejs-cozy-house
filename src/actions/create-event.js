import dispatch from '../library/dispatch'
import { env } from '../library/env'
import bugger from '../library/bagger'

/**
 * Adding an event to the queue
 *
 * @param ctx
 */
export default ctx => {
  // add req-data
  // add req-meta
  // add client-ip

  return dispatch(env.QUEUE_NAME, bugger.pack(ctx))
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
