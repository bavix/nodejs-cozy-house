const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const dispatch = require('../../queue/dispatch');

const { enqueue } = require('../../consts/routes');

/* POST event listing. */
router.post('/event', function (req, res, next) {

    const entity = new Event(req, res);
    entity.request();
    entity.recipient();
    // entity.queue();

    // write to queue
    dispatch(enqueue, entity.toObject());

    res.status(201).send({
        status: 'ok'
    });

});

module.exports = router;
