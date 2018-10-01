
const Router = require('koa-router');
const Event = require('../../models/Event');
const dispatch = require('../../queue/dispatch');
const checkAuth = require('../../auth');

const { enqueue } = require('../../consts/routes');

const router = new Router({
    prefix: '/api'
});

router.use('/event', async (ctx, next) => {
    if (ctx.req.method === 'POST' && !await checkAuth(ctx)) {
        ctx.status = 401;
    }

    return next();
});

/* POST event listing. */
router.post('/event', async function (ctx, next) {

    const entity = new Event(ctx);
    entity.recipient();

    if (!entity.validate()) {
        ctx.throw(400, 'Bad Request');
    }

    // write to queue
    await dispatch(enqueue, entity).then(() => {
        ctx.status = 202;
        ctx.body = {
            message: 'Accepted'
        };
    }).catch((err) => {
        ctx.throw(504, 'Gateway Timeout');
    });

});

module.exports = router;
