#!/usr/bin/env node
import { createServer } from '../library/server'
import { logger } from '../library/logger'
import { env } from '../library/env'

createServer().then(
  app => {
    app.listen(env.PORT, () => {
      logger.debug('Server started', {
        port: env.PORT,
        mode: env.NODE_ENV
      })
    })
  },
  err => {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
)
