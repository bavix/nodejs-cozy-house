const amqp = require('amqplib');
const crypto = require('crypto');

const uuid = require('uuid/v4');
const correlationId = uuid();

const contentTypes = require('../consts/contentTypes');

module.exports = (route, message) => {

    let contentType = contentTypes.text;
    if (typeof message !== 'string') {
        message = JSON.stringify(message);
        contentType = contentTypes.json;
    }

    const messageId = crypto.createHmac(process.env.CRYPTO_ALGO, process.env.CRYPTO_SECRET)
        .update(message)
        .digest('hex');

    amqp.connect(process.env.QUEUE_URL, {
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
                    contentType,
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
