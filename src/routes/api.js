import Router from 'koa-router'
import auth from '../middleware/check-auth'
import createEvent from '../actions/create-event'

const router = new Router({ prefix: '/api' })
router.post('/event', auth, createEvent)

export default router
