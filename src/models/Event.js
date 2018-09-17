
let os = require('os');
const ip = require('ip');
const Machine = require('./Machine');

class Event {
    constructor(req, res, params) {
        this.req = req;
        this.res = res;

        // load param's in model
        if (params !== undefined) {
            for (const param in params) {
                if (params.hasOwnProperty(param)) {
                    this[param] = params[param];
                }
            }
        }
    }

    machine() {
        return Object.entries(
            new Machine(this.req, this.res)
        );
    }

    recipient() {
        const machine = this.machine();
        for (const [key, value] of machine) {
            this['recipient_' + key] = value;
        }
    }

    consumer() {
        const machine = this.machine();
        for (const [key, value] of machine) {
            this['consumer_' + key] = value;
        }
    }
}

module.exports = Event;
