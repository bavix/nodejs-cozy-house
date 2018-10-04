
const batchSize = Number(process.env.CLICKHOUSE_BATCHSIZE);

class Store {
    constructor() {
        this.index = 0;
        this.items = [];
    }

    persist(...items) {
        this.items.push(...items);
        this.index += items.length;

        if (this.index >= batchSize) {
            this.index = 0;
            this.flush();
        }
    }

    flush(callback) {
        this.items = [];

        if (typeof callback === "function") {
            callback(this);
        }
    }
}

module.exports = Store;
