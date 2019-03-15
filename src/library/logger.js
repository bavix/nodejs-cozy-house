import env from './env'
import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  level: env.get('LOG_LEVEL', 'info'),
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()]
})
