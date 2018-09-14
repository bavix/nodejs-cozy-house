var express = require('express');
var router = express.Router();

/* GET event listing. */
router.get('/test', function(req, res, next) {
    res.send('test');
});

module.exports = router;
