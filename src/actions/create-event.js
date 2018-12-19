import dispatch from '../library/dispatch'
import { env } from '../library/env'
// import Entity from '../dict/entity'

/**
 * Adding an event to the queue
 *
 * @param ctx
 */
export default ctx => {
  // const entity = new Entity(ctx)
  return dispatch(env.QUEUE_NAME, 'Hello World')
    .then(res => {
      ctx.status = 202
      ctx.body = {
        message: 'Accepted'
      }
    })
    .catch(res => {
      ctx.throw(504)
    })
}
