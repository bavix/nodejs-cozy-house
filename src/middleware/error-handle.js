/**
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
export default async (ctx, next) => {
  try {
    await next()
  } catch ({ statusCode, status, message }) {
    ctx.status = statusCode || status || 500
    ctx.body = typeof message === 'string' ? { message } : message
  }
}
