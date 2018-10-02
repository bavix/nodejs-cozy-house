
const timeout = Number(process.env.QUEUE_TIMEOUT);
const amqp = require('./amqp');

/**
 * @param route
 * @param workload
 *
 * @return {Promise}
 */
module.exports = (route, workload) => {

    return amqp({timeout}).then(function(conn) {

        return conn.createChannel().then(function(ch) {

            return ch.assertQueue(route, {durable: true}).then(() => {
                ch.sendToQueue(route, Buffer.from(workload.toString()), {
                    deliveryMode: true
                });

                return ch.close();
            });

        }).finally(() => {
            conn.close()
        });
        
    });

};
