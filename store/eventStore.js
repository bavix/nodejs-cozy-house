
const _ = require('lodash');
const Store = require('./index');
const Event = require('../models/Event');
const ClickHouse = require('@apla/clickhouse');
const database = process.env.CLICKHOUSE_SCHEMA;

const auth = process.env.CLICKHOUSE_USER + ':' + process.env.CLICKHOUSE_PASSWORD;

// storage's
const fs = require('fs');
const ch = new ClickHouse({
    host: process.env.CLICKHOUSE_HOST,
    port: process.env.CLICKHOUSE_PORT,
    auth,
    pathname: '/' + database
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
        super.persist(...items);
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
            'INSERT INTO events (' + keys.join(', ') + ')',
            {format: 'JSONEachRow', queryOptions: {database}},
            (err) => {
                if (err) {
                    const timestamp = +new Date();
                    const pid = process.pid;
                    const path = __dirname + '/../dump/';
                    const file = path + timestamp + '-' + pid + '.json';
                    fs.writeFileSync(file, JSON.stringify(items), 'utf-8');
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
