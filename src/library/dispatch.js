import { env } from './env'
import queue from './amqp'

const timeout = env.QUEUE_TIMEOUT

/**
 * The method that adds to the queue
 *
 * @param route
 * @param workload
 * @return {Promise<any | never>}
 */
export default (route, workload) => {
  return queue({ timeout }).then(conn => {
    return conn.createChannel().then(function(ch) {
      return ch.assertQueue(route, { durable: true }).then(() => {
        ch.sendToQueue(route, Buffer.from(workload.toString()), {
          deliveryMode: true
        })

        return ch.close()
      })
    })
  })
}
