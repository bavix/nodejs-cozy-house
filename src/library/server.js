import * as http from 'http'

import cors from '@koa/cors'
import body from 'koa-body'
import json from 'koa-json'
import Koa from 'koa'

import { logger } from './logger'

import errorHandle from '../middleware/error-handle'
import pageNotFound from '../middleware/not-found'

import apiRoute from '../routes/api'

export async function createServer() {
  logger.debug('Creating server...')
  const app = new Koa()

  app.use(cors())
  app.use(errorHandle)
  app.use(body({ jsonStrict: false }))
  app.use(json({ pretty: false }))

  /**
   * @see https://github.com/koajs/koa/issues/599
   */
  app.proxy = true

  // middleware
  app.use(apiRoute.allowedMethods())
  app.use(apiRoute.routes())
  app.use(pageNotFound)

  const server = http.createServer(app.callback())
  server.on('close', () => {
    logger.debug('Server closing, bye!')
  })

  return server
}
