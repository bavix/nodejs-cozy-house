const amqp = require('amqplib');
const uuid = require('uuid/v4');
const correlationId = uuid();
const queueUrl = require('./url');
const timeout = Number(process.env.QUEUE_TIMEOUT);

module.exports = (route, workload) => {

    return amqp.connect(queueUrl, {timeout}).then(function(conn) {

        return conn.createChannel().then(function(ch) {

            return ch.assertQueue(route, {durable: true}).then(() => {
                ch.sendToQueue(route, Buffer.from(workload.toString()), {
                    deliveryMode: true,
                    correlationId
                });

                return ch.close();
            });

        }).finally(() => {
            conn.close()
        });
        
    });

};
