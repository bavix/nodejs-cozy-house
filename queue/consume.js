
const term = require('./signals/term');
const hup = require('./signals/hup');
const amqp = require('amqplib');
const queueUrl = require('./url');

module.exports = (store, route, consume) => {

    return amqp.connect(queueUrl).then((conn) => {

        const terminate = term(store, conn);
        const hangUp = hup(store, conn);

        // signals
        process.once('SIGTERM', terminate);
        process.once('SIGINT', terminate);
        process.once('SIGHUP', hangUp);

        return conn.createChannel().then(function (ch) {

            const queue = ch.assertQueue(route, {durable: true});

            queue.then(() => {
                ch.prefetch(1);
            });

            return queue.then(() => {
                ch.consume(route, function() {
                    return consume.call(ch, queue, ...arguments);
                }, {
                    noAck: false
                })
            });

        }).catch(terminate);

    });

};
