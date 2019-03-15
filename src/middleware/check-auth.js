import Target from '../models/target'
import { REGEX_UUID } from '../consts'

const getToken = ctx => {
  const { header } = ctx.request
  if (header && header.authorization) {
    const [type, token] = header.authorization.split(' ')
    if (type === 'Bearer' && token.match(REGEX_UUID)) {
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
  const app = target.app
  const device = target.device
  for (let data of ctx.request.body) {
    data.target = app
    data.event.device = device
  }
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
