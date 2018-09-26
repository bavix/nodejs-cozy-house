const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const dispatch = require('../../queue/dispatch');

const { enqueue } = require('../../consts/routes');

var Referer = require('referer-parser');

/* POST event listing. */
router.post('/event', async function (req, res, next) {

    const entity = new Event(req, res);
    entity.recipient();

    // write to queue
    await dispatch(enqueue, entity).then((res) => {
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
