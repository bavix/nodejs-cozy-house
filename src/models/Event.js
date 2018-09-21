
let os = require('os');
const ip = require('ip');
const Machine = require('./Machine');
const platform = require('platform');
const isBot = require('isbot');

class Event {
    constructor(req, res, params) {
        this._req = req;
        this._res = res;

        // load param's in model
        if (params !== undefined) {
            for (const param in params) {
                if (params.hasOwnProperty(param)) {
                    this[param] = params[param];
                }
            }
        }
    }

    platform() {
        this.request_user_agent = this._req.get('User-Agent');

        if (!this.request_user_agent) {
            return;
        }

        this.request_bot = isBot(this.request_user_agent);
        const pl = platform.parse(this.request_user_agent);

        this.platform_name = pl.name;
        this.platform_version = pl.version;
        this.platform_product = pl.product;
        this.platform_manufacturer = pl.manufacturer;
        this.platform_layout = pl.layout;

        // os
        this.platform_os_arch = pl.os.architecture;
        this.platform_os_family = pl.os.family;
        this.platform_os_version = pl.os.version;
    }

    recipient() {
        this.request_language = this._req.acceptsLanguages().shift();
        this.request_sid = this._req.session.id;
        this.request_secure = this._req.secure;
        this.request_method = this._req.method;
        this.request_ajax = this._req.xhr;
        this.request_ip = this._req.ip;

        const machine = this._machine();
        for (const [key, value] of machine) {
            this['recipient_' + key] = value;
        }

        this.platform();
    }

    consumer() {
        const machine = this._machine();
        for (const [key, value] of machine) {
            this['consumer_' + key] = value;
        }
    }

    toArray() {
        let results = [];

        for (const [entry, value] of Object.entries(this)) {
            if (entry.indexOf('_') !== 0) {
                results[entry] = value;
            }
        }

        return results;
    }

    _machine() {
        return Object.entries(
            new Machine(this._req, this._res)
        );
    }
}

module.exports = Event;
