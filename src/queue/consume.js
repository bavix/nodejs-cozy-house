import { env } from '../library/env'
import amqp from '../library/amqp'

const timeout = env.QUEUE_TIMEOUT

export default (route, consume) => {
  return amqp({ timeout }).then(conn => {
    return conn.createChannel().then(ch => {
      const queue = ch.assertQueue(route, { durable: true })
      queue.then(() => ch.prefetch(1))

      return queue.then(() => {
        ch.consume(
          route,
          function() {
            return consume.call(ch, queue, ...arguments)
          },
          {
            noAck: false
          }
        )
      })
    })
  })
}
