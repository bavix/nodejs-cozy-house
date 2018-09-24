#!/usr/bin/env node

// load env
require('dotenv').load();

var amqp = require('amqplib');

function amqpDisconnect(conn) {
    console.log('write data to clickhouse');
    console.log('done');

    conn.close(() => process.exit(1));
}

const store = [];
console.log(process.env.QUEUE_URL);
amqp.connect(process.env.QUEUE_URL).then(function(conn) {

    process.once('SIGTERM', () => amqpDisconnect(conn));
    process.once('SIGINT', () => amqpDisconnect(conn));

    return conn.createChannel().then(function(ch) {

        var queue = ch.assertQueue('task_queue', { durable: true });

        queue = queue.then(function() {
            ch.prefetch(1);
        });

        return queue.then(function() {
            ch.consume('task_queue', doWork, {noAck: false});
            console.log(" [*] Waiting for messages. To exit press CTRL+C");
        });

        function doWork(msg) {
            // console.log(process.platform);
            // console.log(process.arch);
            // console.log(process.title);
            // console.log(process.ppid);
            // console.log(process.pid);
            // console.log(process.getuid());
            // console.log(process.getgid());
            // console.log(process.hrtime());
            // console.log(process.uptime());
            // console.log(process.version);
            const body = msg.content.toString();
            console.log(" [x] Received '%s'", body);

            store.push(body);
            console.log(store);

            const secs = body.split('.').length - 1;
            console.log(" [x] Task takes %d seconds", secs);
            setTimeout(function() {
                console.log(" [x] Done");
                console.log(process.hrtime());
                ch.ack(msg);
            }, secs * 1000);
        }

    }).catch(() => amqpDisconnect(conn));

}).catch(console.warn);
