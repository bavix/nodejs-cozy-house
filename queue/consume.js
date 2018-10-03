
const term = require('./signals/term');
const amqp = require('./amqp');

module.exports = (store, route, consume) => {

    return amqp().then((conn) => {

        const terminate = term(store, conn);

        // signals
        process.once('SIGTERM', terminate);
        process.once('SIGINT', terminate);
        process.once('SIGHUP', store.flush.bind(store));

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
