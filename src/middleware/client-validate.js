import Schema from 'validate'
import env from '../library/env'

/**
 * @param {Object} rules
 * @return {Function}
 */
export default rules => {
  /**
   * @type {exports.default}
   */
  const schema = new Schema(rules, { typecast: false })

  /**
   * validation of each event
   *
   * @param {Object} ctx
   * @param {Object} event
   * @param {String} prefix
   */
  const validate = (ctx, event, prefix) => {
    const validate = schema.validate(event)

    if (validate.length > 0) {
      const message = []
      for (const field of validate) {
        message.push({
          name: prefix + '.' + field.path,
          message: field.message
        })
      }

      return message
    }

    return null
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  return (ctx, next) => {
    const events = ctx.request.body
    if (!Array.isArray(events)) {
      ctx.throw(400, {
        message: 'An array of events is required'
      })
    }

    if (events.length > env.get('EVENT_BATCHSIZE', 25)) {
      ctx.throw(431, {
        message: 'Too many events, with frequent'
      })
    }

    let errors = []
    for (const index in events) {
      if (events.hasOwnProperty(index)) {
        const _errors = validate(ctx, events[index], index)
        if (_errors) {
          errors.push(_errors)
        }
      }
    }

    if (errors.length) {
      ctx.throw(422, {
        message: { errors: [].concat(...errors) }
      })
    }

    return next()
  }
}
