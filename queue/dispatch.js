const timeout = Number(process.env.QUEUE_TIMEOUT);
const queueUrl = require('./url');
const amqp = require('amqplib');

/**
 * @param route
 * @param workload
 *
 * @return {Promise}
 */
module.exports = (route, workload) => {

    return amqp.connect(queueUrl, {timeout}).then(function(conn) {

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
