
let os = require('os');
const ip = require('ip');
const Machine = require('./Machine');
const platform = require('platform');
const isBot = require('isbot');
const _ = require('lodash');

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

    request() {
        this.request_method = this._req.method;
        this.request_language = this._req.acceptsLanguages().shift();
        this.request_secure = this._req.secure;
        this.request_ajax = this._req.xhr;
        this.request_route = null;
        this.request_domain = null;
        this.request_url = null;
        this.request_ip = this._req.ip;
        this.request_bot = true;
        this.request_user_agent = this._req.get('User-Agent');
        this.request_sid = null;

        const body = this._req.body;
        this.page_load_time = body.page_load_time;

        _.forEach(this._req.body.request, (value, key) => {
            this['request_' + key] = value;
        });
    }

    recipient() {
        this.request();
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

    entries() {
        return Object.entries(this);
    }

    toObject() {
        return _.zipObject(..._.unzip(_.filter(this.entries(), ([entry]) => {
            return entry.indexOf('_') !== 0;
        })));
    }

    _machine() {
        return Object.entries(
            new Machine(this._req, this._res)
        );
    }
}

module.exports = Event;
