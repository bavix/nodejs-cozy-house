const amqp = require('amqplib');

module.exports = amqp.connect(process.env.QUEUE_URL);
