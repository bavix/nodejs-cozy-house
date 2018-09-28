
const batchSize = Number(process.env.CLICKHOUSE_BATCHSIZE);

class Store {
    constructor() {
        this.index = 0;
        this.items = [];
    }

    persist(item) {
        this.items.push(item);
        if (++this.index >= batchSize) {
            this.index = 0;
            this.flush();
        }
    }

    flush(callback) {
        this.items = [];

        if (callback) {
            callback(this);
        }
    }
}

module.exports = Store;
