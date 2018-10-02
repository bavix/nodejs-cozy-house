
const term = require('./signals/term');
const hup = require('./signals/hup');
const amqp = require('./amqp');

module.exports = (store, route, consume) => {

    return amqp().then((conn) => {

        const terminate = term(store, conn);
        const hangUp = hup(store);

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
