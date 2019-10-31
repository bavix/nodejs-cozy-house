import recipient from '../dict/recipient'

/**
 * @return {Function}
 */
export default (ctx, next) => {
  const dataRecipient = recipient(ctx)

  for (const data of ctx.request.body) {
    data.recipient = dataRecipient
  }

  return next()
}
