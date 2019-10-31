/**
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
export default (ctx, next) => {
  ctx.throw(404)
}
