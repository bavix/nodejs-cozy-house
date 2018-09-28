
const url = require('url');
let os = require('os');
const ip = require('ip');
const Machine = require('./Machine');
const platform = require('platform');
const isBot = require('isbot');
const _ = require('lodash');
const Referrer = require('referer-parser');

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

    _platform() {
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
        const body = this._req.body;

        this.target = this._req.appTarget;
        this.request_method = this._req.method;
        this.request_language = this._req.acceptsLanguages().shift();
        this.request_secure = this._req.secure;
        this.request_ajax = this._req.xhr;
        this.request_route = null;
        this.request_url = body.url || null;
        this.request_domain = url.parse(this.request_url || '').hostname;
        this.request_ip = this._req.ip;
        this.request_user_agent = this._req.get('User-Agent');
        this.request_bot = isBot(this.request_user_agent);

        this.google_client_id = body.google_client_id || null;
        this.session_id = body.session_id || null;
        this.gclid = body.gclid || null;
        this.ym_client_id = body.ym_client_id || null;
        this.ymclid = body.ymclid || null;
        this.yclid = body.yclid || null;
        this.ef_id = body.ef_id || null;

        this.page_load_time = body.page_load_time || 0;

        const allow = ['method', 'language', 'secure', 'ajax', 'route'];
        _.forEach(body.request, (value, key) => {
            if (allow.includes(key)) {
                this['request_' + key] = value;
            }
        });
    }

    _event() {
        this.event_device = null;
        this.event_category = null;
        this.event_action = null;
        this.event_label = null;
        this.event_value = null;
        this.event_json = null;
    }

    _visitor() {
        this.visitor_webp = null;
        this.visitor_user_id = null;
        this.visitor_uuid = null;
        this.visitor_browser_width = null;
        this.visitor_browser_height = null;
        this.visitor_device_width = null;
        this.visitor_device_height = null;
        this.visitor_device = null;
        this.visitor_device_orientation = null;
    }

    _referrer() {
        const body = this._req.body;
        const ref = new Referrer(
            this._req.get('Referer') || '',
            body.url
        );

        // referrer
        this.referrer_known = Number(ref.known);
        this.referrer_name = ref.referer || null;
        this.referrer_medium = ref.medium === 'unknown' ? null : ref.medium;
        this.referrer_search_parameter = ref.search_parameter || null;
        this.referrer_search_term = ref.search_term || null;
        this.referrer_uri = ref.uri.href || null;

        // utm
        this.utm_source = body.utm_source || null;
        this.utm_medium = body.utm_medium || null;
        this.utm_term = body.utm_term || null;
        this.utm_content = body.utm_content || null;
        this.utm_campaign = body.utm_campaign || null;
    }

    recipient() {
        this.request();
        const machine = this._machine();
        for (const [key, value] of machine) {
            this['recipient_' + key] = value;
        }

        this._platform();
        this._referrer();
        this._visitor();
        this._event();
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

    toString() {
        return JSON.stringify(this.toObject());
    }

    _machine() {
        return Object.entries(
            new Machine(this._req, this._res)
        );
    }
}

module.exports = Event;
