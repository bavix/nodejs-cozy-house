const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const dispatch = require('../../queue/dispatch');
const checkAuth = require('../../auth');

const { enqueue } = require('../../consts/routes');

router.use('/event', async (req, res, next) => {
    if (req.method === 'POST' && !await checkAuth(req)) {
        const error = new Error('Unauthorized');
        error.httpStatusCode = 401;
        return next(error)
    }

    next();
});

/* POST event listing. */
router.post('/event', async function (req, res, next) {

    const entity = new Event(req, res);
    entity.recipient();

    // write to queue
    await dispatch(enqueue, entity).then(() => {
        res.status(202).send({
            message: 'Accepted'
        });
    }).catch((err) => {
        res.status(504).send({
            message: 'Gateway Timeout'
        });
    });

});

module.exports = router;
