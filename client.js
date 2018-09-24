#!/usr/bin/env node

var amqp = require('amqplib');

amqp.connect(config.url, {
    timeout: 50
}).then(function(conn) {
    return conn.createChannel().then(function(ch) {
        var ok = ch.assertQueue('task_queue', {durable: true});
        var msg = 'Hello World';

        return ok.then(() => {
            ch.sendToQueue('task_queue', Buffer.from(msg), {deliveryMode: true});
            console.log(" [x] Sent '%s'", msg);
            return ch.close();
        });

    }).finally(() => conn.close());
});
