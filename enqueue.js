#!/usr/bin/env node

// load env
require('dotenv').load();

const amqp = require('./queue/consume');
const routes = require('./queue/routes');

const queue = amqp(routes.enqueue, function (queue, message) {
    console.log(message.content.toString());
    this.ack(message); // end
});
