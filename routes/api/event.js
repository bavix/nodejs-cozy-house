const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const routes = require('../../queue/routes');
const dispatch = require('../../queue/dispatch');

/* POST event listing. */
router.post('/event', function (req, res, next) {

    const event = new Event(req, res);
    event.recipient();
    // event.queue();

    // write to queue
    dispatch(routes.enqueue, event.toObject());

    res.status(201).send({
        status: 'ok'
    });
});

module.exports = router;
