var express = require('express');
var router = express.Router();

/* GET event listing. */
router.get('/event', function (req, res, next) {
    res.send({
        status: 'ok',
        rand: Math.random()
    });
});

module.exports = router;
