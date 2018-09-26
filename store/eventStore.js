
const Store = require('./index');
const Event = require('../models/Event');

class EventStore extends Store {
    persist(item) {
        const model = new Event(undefined, undefined, item);
        model.consumer();
        super.persist(model.toObject());
    }

    flush() {
        console.log(this.items);
        super.flush();
    }
}

module.exports = EventStore;
