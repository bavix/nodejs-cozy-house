import Target from '../models/target'

const getToken = ctx => {
  const { header } = ctx.request
  if (header && header.authorization) {
    const [type, token] = header.authorization.split(' ')
    if (type === 'Bearer') {
      return token
    }
  }

  return null
}

const getTarget = ctx => {
  const token = getToken(ctx)
  if (!token) {
    return null
  }

  return Target.query()
    .where('token', token)
    .first()
}

const modify = (target, ctx) => {
  const { event } = ctx.request.body
  ctx.request.body.target = target.app
  event.device = target.device
}

/**
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
export default async (ctx, next) => {
  const target = await getTarget(ctx)

  if (!target) {
    ctx.throw(401, {
      message: 'Unauthorized'
    })
  }

  modify(target, ctx)
  await next()
}
