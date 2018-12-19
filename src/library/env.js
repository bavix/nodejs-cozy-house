import yenv from 'yenv'
import { logger } from './logger'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export let env

const options = {
  message: key => `[yenv] ${key} not found in the loaded environment`,
  logBeforeThrow: message => logger.error(message)
}

try {
  env = yenv('local.yaml', options)
} catch (e) {
  env = yenv('env.yaml', options)
}
