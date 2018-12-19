const queue = require('../library/amqp')

export default (route, consume) => {
  return queue()
    .then(conn => {})
    .catch(console.log)
}
