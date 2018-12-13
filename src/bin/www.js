#!/usr/bin/env node
import { createServer } from '../library/server'
import { env } from '../library/env'
import { logger } from '../library/logger'

createServer().then(
  app =>
    app.listen(env.PORT, () => {
      const mode = env.NODE_ENV
      logger.debug(`Server listening on ${env.PORT} in ${mode} mode`)
    }),
  err => {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
)
