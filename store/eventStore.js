
const _ = require('lodash');
const Store = require('./index');
const Event = require('../models/Event');
const ClickHouse = require('@apla/clickhouse');
const schema = process.env.CLICKHOUSE_SCHEMA;

const auth = process.env.CLICKHOUSE_USER + ':' + process.env.CLICKHOUSE_PASSWORD;

// storage's
const fs = require('fs');
const ch = new ClickHouse({
    host: process.env.CLICKHOUSE_HOST,
    port: process.env.CLICKHOUSE_PORT,
    auth,
    pathname: '/' + schema
});

class EventStore extends Store {
    persist(item) {
        const model = new Event(undefined, item);
        model.consumer();
        super.persist(model.toObject());
    }

    /**
     * @param items {Array<Object>}
     */
    join(items) {
        for (const item of items) {
            super.persist(item);
        }
    }

    flush(callback) {
        if (this.items.length <= 0) {
            return;
        }

        const items = _.map(this.items, _.clone);
        super.flush(callback);

        const head = _.head(items);
        const keys = _.keys(head);
        const stream = ch.query(
            'INSERT INTO ' + schema + '.events (' + keys.join(', ') + ')',
            {format: 'JSONEachRow'},
            (error) => {
                if (error) {
                    const timestamp = +new Date();
                    const pid = process.pid;
                    const path = __dirname + '/../dump/';
                    const file = path + timestamp + '-' + pid + '.json';
                    fs.writeFile(file, JSON.stringify(items), (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
        );

        _.forEach(items, (item) => {
            stream.write(item);
        });

        stream.end();
    }
}

module.exports = EventStore;
