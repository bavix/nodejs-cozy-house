
class Url {
    constructor(options) {
        this.schema = options.schema || null;
        this.host = options.host || null;
        this.port = options.port || null;
        this.path = options.path || null;
        this.user = options.user || null;
        this.pass = options.pass || null;
    }

    toString() {
        let auth;
        if (this.user && this.pass) {
            auth = this.user + ':' + this.pass;
        }

        const result = (this.schema ? this.schema + '://' : '') +
            (auth ? auth + '@' : '') +
            (this.host ? this.host : '') +
            (!this.port || Number(this.port) === 80 ? '' : ':' + this.port) +
            '/' + (this.path ? this.path.trim('/') : '');

        if (result === '/') {
            return null;
        }

        return result;
    }
}

module.exports = Url;
