
const Bearer = require('./bearer');

const data = [];

class Cache {
    constructor(ttl, value) {
        this.value = value;
        this.time = +new Date() + Number(ttl);
    }

    get invalid() {
        return this.time < +new Date();
    }
}

class Store {
    /**
     * @param ctx
     */
    constructor(ctx) {
        this.ctx = ctx;
        this.bearer = new Bearer(ctx);
    }

    get target() {
        const cache = data[this.token] || null;
        if (cache) {
            this.appTarget = cache.value;
        }
        return cache;
    }

    get token() {
        return this.bearer.token;
    }

    get exists() {
        return this.target !== null;
    }

    get invalid() {
        return Boolean(!this.target || this.target.invalid);
    }

    get appTarget() {
        return this.ctx.state.appTarget || null;
    }

    set appTarget(value) {
        this.ctx.state.appTarget = value;
    }

    save(appTarget) {
        this.appTarget = appTarget;
        data[this.token] = new Cache(120 * 1000, this.appTarget);
    }

    unauthorized() {
        this.bearer.unauthorized();
    }
}

module.exports = Store;
