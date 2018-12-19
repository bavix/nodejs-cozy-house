import Router from 'koa-router'
import compose from 'koa-compose'

import createEvent from '../actions/create-event'

import ClientValidate from '../middleware/client-validate'
import client from '../rules/client'

import CheckAuth from '../middleware/check-auth'
import ModifyRequest from '../middleware/modify-request'

const router = new Router({ prefix: '/api' })

// event adding route
router.post(
  '/event',
  compose([ClientValidate(client), CheckAuth, ModifyRequest]),
  createEvent
)

export default router
