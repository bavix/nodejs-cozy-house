import { logger } from '../library/logger'

/**
 * Adding an event to the queue
 *
 * @param ctx
 */
export default ctx => {
  // const entity = new Event(ctx);
  // entity.recipient();

  // if (!entity.validate()) {
  //     ctx.throw(400);
  // }

  // // write to queue
  // return dispatch(enqueue, entity).then(() => {
  //     ctx.status = 202;
  //     ctx.body = {
  //         message: 'Accepted'
  //     };
  // }).catch((err) => {
  //     ctx.throw(504);
  // });

  logger.debug('Hello World')

  ctx.throw(202, {
    message: 'Accepted'
  })
}
