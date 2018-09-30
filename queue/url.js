
const Url = require('../auth/url');
const url = new Url({
    schema: 'amqp',
    user: process.env.QUEUE_USER,
    pass: process.env.QUEUE_PASSWORD,
    host: process.env.QUEUE_HOST,
    port: process.env.QUEUE_PORT,
});

module.exports = url.toString();
