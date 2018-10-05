
const { URL } = require('url');
let os = require('os');
const ip = require('ip');
const Machine = require('./Machine');
const platform = require('platform');
const isBot = require('isbot');
const _ = require('lodash');
const Referrer = require('referer-parser');
const dateTime = require('date-and-time');

class Event {
    constructor(ctx, params) {
        this._ctx = ctx;

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

    _request(body) {
        // loading
        const [target, device] = this._ctx.state.appTarget.split(':');

        // set target & device
        this.target = target;
        this.event_device = device;

        this.request_method = this._ctx.method;
        this.request_language = this._ctx.acceptsLanguages().shift();
        this.request_secure = this._ctx.secure;
        this.request_ajax = this._ctx.state.xhr;
        this.request_route = null;
        this.request_url = null;
        this.request_ip = this._ctx.ip;
        this.request_user_agent = this._ctx.get('user-agent');
        this.request_bot = false;

        const allow = ['method', 'language', 'secure', 'ajax', 'route', 'url'];
        _.forEach(body.request, (value, key) => {
            if (allow.includes(key)) {
                this['request_' + key] = value;
            }
        });

        this.request_domain = null;

        // utm
        this.utm_source = null;
        this.utm_medium = null;
        this.utm_term = null;
        this.utm_content = null;
        this.utm_campaign = null;

        this.google_client_id = body.google_client_id || null;
        this.session_id = body.session_id || null;
        this.gclid = body.gclid || null;
        this.ym_client_id = body.ym_client_id || null;
        this.ymclid = body.ymclid || null;
        this.yclid = body.yclid || null;

        this.page_load_time = body.page_load_time || 0;
    }

    _event(body) {
        this.event_category = null;
        this.event_action = null;
        this.event_label = null;
        this.event_value = null;
        this.event_json = null;

        const allow = [
            'category',
            'action',
            'label',
            'value',
            'json',
        ];

        _.forEach(body.event, (value, key) => {
            if (allow.includes(key)) {
                this['event_' + key] = value;
            }
        });
    }

    _visitor(body) {
        this.visitor_user_id = null;
        this.visitor_uuid = null;
        this.visitor_browser_width = null;
        this.visitor_browser_height = null;
        this.visitor_device_width = null;
        this.visitor_device_height = null;
        this.visitor_device = null;
        this.visitor_device_orientation = null;

        const allow = [
            'user_id',
            'uuid',
            'browser_width',
            'browser_height',
            'device_width',
            'device_height',
            'device',
            'device_orientation',
        ];

        _.forEach(body.visitor, (value, key) => {
            if (allow.includes(key)) {
                this['visitor_' + key] = value;
            }
        });
    }

    _referrer(body) {
        const ref = new Referrer(
            this._ctx.get('Referer') || '',
            this.request_url
        );

        // referrer
        this.referrer_known = Number(ref.known);
        this.referrer_name = ref.referer || null;
        this.referrer_medium = ref.medium === 'unknown' ? null : ref.medium;
        this.referrer_search_parameter = ref.search_parameter || null;
        this.referrer_search_term = ref.search_term || null;
        this.referrer_uri = ref.uri.href || null;
    }

    recipient() {
        const body = this._ctx.request.body;

        this._request(body);
        const machine = this._machine();
        for (const [key, value] of machine) {
            this['recipient_' + key] = value;
        }

        this._referrer(body);
        this._visitor(body);
        this._event(body);

        const now = new Date();
        this.created_date = dateTime.format(now, 'YYYY/MM/DD');
        this.created_time = dateTime.format(now, 'YYYY/MM/DD HH:mm:ss');
    }

    consumer() {
        this._platform();
        this.request_bot = isBot(this.request_user_agent);

        try {
            const { searchParams, hostname } = new URL(this.request_url);
            this.request_domain = hostname;
            this.utm_source = searchParams.get('utm_source');
            this.utm_medium = searchParams.get('utm_medium');
            this.utm_term = searchParams.get('utm_term');
            this.utm_content = searchParams.get('utm_content');
            this.utm_campaign = searchParams.get('utm_campaign');
        } catch (e) {
            console.log(e);
        }

        const machine = this._machine(true);
        for (const [key, value] of machine) {
            this['consumer_' + key] = value;
        }
    }

    entries() {
        return Object.entries(this);
    }

    validate() {
        return this.target &&
            this.event_device &&
            this.event_category &&
            this.event_action;
    }

    toObject() {
        return _.zipObject(..._.unzip(_.filter(this.entries(), ([entry]) => {
            return entry.indexOf('_') !== 0;
        })));
    }

    toString() {
        return JSON.stringify(this.toObject());
    }

    _machine(consumer = false) {
        return Object.entries(
            new Machine(this._ctx, consumer)
        );
    }
}

module.exports = Event;
