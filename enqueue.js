#!/usr/bin/env node

// load env
require('dotenv').load();

const amqp = require('./queue/consume');
const { enqueue } = require('./consts/routes');

const EventStore = require('./store/eventStore');
const lockFile = require('lockfile');
const store = new EventStore();
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs');

/**
 * Load dump to
 */
glob('./dump/*.json', (err, files) => {
    for (const file of files) {
        lockFile.lock(file + '.lock', (err) => {
            if (!err) {
                store.join(require(file));
                fs.unlinkSync(file);
            }
        });
    }
});

const queue = amqp(store, enqueue, function (queue, message) {
    if (undefined === message.properties.type) {
        store.persist(JSON.parse(message.content.toString()));
        this.ack(message);
    }
});
