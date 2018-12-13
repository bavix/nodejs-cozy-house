import * as http from 'http'
import Koa from 'koa'
import cors from '@koa/cors'
import respond from 'koa-respond'

import { logger } from './logger'

export async function createServer() {
  logger.debug('Creating server...')
  const app = new Koa()

  app.use(respond()).use(cors())

  const server = http.createServer(app.callback())
  server.on('close', () => {
    logger.debug('Server closing, bye!')
  })

  logger.debug('Server created, ready to listen', { scope: 'startup' })

  return server
}
