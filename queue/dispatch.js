const amqp = require('amqplib');
const crypto = require('crypto');

const uuid = require('uuid/v4');
const correlationId = uuid();

const algo = process.env.CRYPTO_ALGO;
const secret = process.env.CRYPTO_SECRET;
const queueUrl = require('./url');

module.exports = (route, workload) => {

    const message = workload.toString();
    const messageId = crypto.createHmac(algo, secret)
        .update(message)
        .digest('hex');

    return amqp.connect(queueUrl, {
        timeout: parseInt(process.env.QUEUE_TIMEOUT)
    }).then(function(conn) {

        return conn.createChannel().then(function(ch) {

            const ok = ch.assertQueue(route, {durable: true});
            const timestamp = +new Date();

            return ok.then(() => {
                ch.sendToQueue(route, Buffer.from(message), {
                    appId: process.pid.toString(),
                    deliveryMode: true,
                    correlationId,
                    timestamp,
                    messageId
                });

                return ch.close();
            });

        }).finally(() => {
            conn.close()
        });
        
    });

};
