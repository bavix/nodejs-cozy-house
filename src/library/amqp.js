import { connect } from 'amqplib'
import { env } from './env'

/**
 * @param options
 * @return {Promise}
 */
export default options => {
  return connect(
    {
      hostname: env.QUEUE_HOST,
      port: env.QUEUE_PORT,
      username: env.QUEUE_USER,
      password: env.QUEUE_PASSWORD
    },
    options
  )
}
