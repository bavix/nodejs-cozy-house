
class Store {
    constructor() {
        this.items = [];
    }

    persist(item) {
        console.log(item);
        this.items.push(item);
    }

    flush() {
        console.log('flush');
        this.items = [];
    }
}

module.exports = Store;
