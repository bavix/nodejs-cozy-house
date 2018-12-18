const queue = require('./amqp')

export default (route, consume) => {
  return queue().then(conn => {})
}
