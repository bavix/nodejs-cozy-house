import Target from '../models/target'
import { REGEX_UUID } from '../consts'
import mc from '../library/mc'

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

const getTarget = async ctx => {
  const token = getToken(ctx)
  if (!token) {
    return null
  }

  const key = `target_${token}`
  let target = await mc.get(key)

  if (!target) {
    target = await Target.query()
      .where({ token })
      .first()

    if (target) {
      await mc.set(key, target)
    }
  }

  return target
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

  if (!target || !target.active) {
    ctx.throw(401, {
      message: 'Unauthorized'
    })
  }

  modify(target, ctx)
  await next()
}
