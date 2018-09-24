#!/usr/bin/env node

// load env
require('dotenv').load();

var amqp = require('amqplib');

amqp.connect(process.env.QUEUE_URL, {
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
