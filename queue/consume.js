const os = require('os');
const amqp = require('amqplib');
const term = require('./signals/term');
const hup = require('./signals/hup');
const queue = amqp.connect(process.env.QUEUE_URL);

queue.then((conn) => {

    const terminate = term(conn);
    const hangUp = hup(conn);

    // signals
    process.once('SIGTERM', terminate);
    process.once('SIGINT', terminate);
    process.once('SIGHUP', hangUp);

    return conn.createChannel().then(function (ch) {

        var queue = ch.assertQueue(process.env.QUEUE_NAME, {durable: true});

        queue = queue.then(function () {
            ch.prefetch(1);
        });

        // todo

    }).catch(terminate);

});

module.exports = queue;
