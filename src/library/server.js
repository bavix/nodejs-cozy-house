import * as http from 'http'

import cors from '@koa/cors'
import body from 'koa-bodyparser'
import json from 'koa-json'
import Koa from 'koa'

import { logger } from './logger'

import errorHandle from '../middleware/error-handle'
import pageNotFound from '../middleware/not-found'

import apiRoute from '../routes/api'

export async function createServer() {
  logger.debug('Creating app from Koa')
  const app = new Koa()

  logger.debug('Add CORS')
  app.use(cors())

  logger.debug('Add MiddleWare ErrorHandle')
  app.use(errorHandle)

  logger.debug('Add Body')
  app.use(body())

  logger.debug('Add JSON')
  app.use(json({ pretty: false }))

  /**
   * @see https://github.com/koajs/koa/issues/599
   */
  logger.debug('Set App::Proxy=True')
  app.proxy = true

  // middleware
  logger.debug('Add ApiRoute::allowMethods')
  app.use(apiRoute.allowedMethods())

  logger.debug('Add ApiRoute::routes')
  app.use(apiRoute.routes())

  logger.debug('Add MiddleWare PageNotFound')
  app.use(pageNotFound)

  logger.debug('Creating server from App')
  const server = http.createServer(app.callback())

  logger.debug('Add server listener on close')
  server.on('close', () => {
    logger.debug('Server closing, bye!')
  })

  return server
}
