import * as http from 'http'

import respond from 'koa-respond'
import isAjax from 'koa-isajax'
import cors from '@koa/cors'
import body from 'koa-body'
import json from 'koa-json'
import Koa from 'koa'

import { logger } from './logger'

export async function createServer() {
  logger.debug('Creating server...')
  const app = new Koa()

  app.use(json({ pretty: false }))
  app.use(respond())
  app.use(isAjax())
  app.use(body())
  app.use(cors())

  /**
   * @see https://github.com/koajs/koa/issues/599
   */
  app.proxy = true

  const server = http.createServer(app.callback())
  server.on('close', () => {
    logger.debug('Server closing, bye!')
  })

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return server
}
