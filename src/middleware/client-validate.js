import Schema from 'validate'

/**
 * @param {Object} rules
 * @return {Function}
 */
export default rules => {
  /**
   * @type {exports.default}
   */
  const schema = new Schema(rules)

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  return (ctx, next) => {
    const validate = schema.validate(ctx.request.body)

    if (validate.length > 0) {
      const message = []
      for (let field of validate) {
        message.push({
          name: field.path,
          message: field.message
        })
      }

      ctx.throw(400, { message })
    }

    return next()
  }
}
