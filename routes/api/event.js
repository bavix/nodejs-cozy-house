
const Router = require('koa-router');
const Event = require('../../models/Event');
const dispatch = require('../../queue/dispatch');
const checkAuth = require('../../auth');

const { enqueue } = require('../../consts/routes');

const router = new Router({
    prefix: '/api'
});

/* POST event listing. */
router.post('/event', checkAuth, (ctx) => {

    const entity = new Event(ctx);
    entity.recipient();

    if (!entity.validate()) {
        ctx.throw(400);
    }

    // write to queue
    return dispatch(enqueue, entity).then(() => {
        ctx.status = 202;
        ctx.body = {
            message: 'Accepted'
        };
    }).catch((err) => {
        ctx.throw(504);
    });

});

module.exports = router;
