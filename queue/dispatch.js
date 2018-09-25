const amqp = require('amqplib');

module.exports = (route, message) => {

    if (typeof message !== 'string') {
        message = JSON.stringify(message);
    }

    amqp.connect(process.env.QUEUE_URL, {
        timeout: parseInt(process.env.QUEUE_TIMEOUT)
    }).then(function(conn) {
        
        return conn.createChannel().then(function(ch) {

            const ok = ch.assertQueue(route, {durable: true});

            return ok.then(() => {
                ch.sendToQueue(route, Buffer.from(message), {
                    deliveryMode: true
                });

                return ch.close();
            });

        }).finally(() => {
            conn.close()
        });
        
    });

};
