import yenv from 'yenv'
import { logger } from './logger'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const local = () => {
  try {
    return yenv('local.yaml')
  } catch (e) {
    return process.env
  }
}

export const env = yenv('env.yaml', {
  message: key => `[yenv] ${key} not found in the loaded environment`,
  logBeforeThrow: message => logger.error(message),
  envObject: local()
})
