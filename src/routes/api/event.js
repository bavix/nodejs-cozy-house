const express = require('express');
const router = express.Router();
const Machine = require('../../models/Machine');
const Event = require('../../models/Event');

/* GET event listing. */
router.get('/event', function (req, res, next) {
    const event = new Event(req, res);
    event.recipient();
    // event.queue();

    console.log(event.toArray());

    res.send({
        status: 'ok',
        rand: Math.random(),
    });
});

module.exports = router;
