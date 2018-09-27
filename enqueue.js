#!/usr/bin/env node

// load env
require('dotenv').load();

const amqp = require('./queue/consume');
const { enqueue } = require('./consts/routes');

const EventStore = require('./store/eventStore');
const store = new EventStore();

const queue = amqp(store, enqueue, function (queue, message) {
    if (undefined === message.properties.type) {
        store.persist(JSON.parse(message.content.toString()));
        this.ack(message);
    }
});
