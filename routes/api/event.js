const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');

/* POST event listing. */
router.post('/event', function (req, res, next) {
    const event = new Event(req, res);
    event.recipient();
    // event.queue();

    console.log(req.body);
    console.log(event.toArray());

    res.status(201).send({
        status: 'ok'
    });
});

module.exports = router;
