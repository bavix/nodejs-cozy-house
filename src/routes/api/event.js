var express = require('express');
var router = express.Router();

/* GET event listing. */
router.get('/event', function (req, res, next) {
    console.log(process.platform);
    console.log(process.arch);
    console.log(process.title);
    console.log(process.ppid);
    console.log(process.pid);
    console.log(process.getuid());
    console.log(process.getgid());
    console.log(process.hrtime());
    console.log(process.uptime());
    console.log(process.version);
    console.log(res);
    res.send({
        status: 'ok',
        rand: Math.random(),
    });
});

module.exports = router;
