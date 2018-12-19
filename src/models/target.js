import Model from '../library/model'

class Target extends Model {
  /**
   * @return {string}
   */
  static get tableName() {
    return 'targets'
  }

  /**
   * @return {Object}
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['token', 'name'],
      properties: {
        token: { type: 'string', minLength: 36, maxLength: 36 },
        name: { type: 'string', minLength: 3, maxLength: 40 }
      }
    }
  }

  get app() {
    return this.name.split(':').shift()
  }

  get device() {
    return this.name.split(':').pop()
  }
}

export default Target
