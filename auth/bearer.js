
class Bearer {
    constructor(ctx) {
        this.token = null;
        this.type = 'Bearer';
        this.ctx = ctx;
        const { header } = ctx.request;
        if (header && header.authorization) {
            const [type, token] = header.authorization.split(' ');
            if (type === this.type) {
                this.token = token;
            } else {
                ctx.throw(400);
            }
        } else {
            this.unauthorized();
        }
    }

    unauthorized() {
        this.ctx.throw(401);
    }
}

module.exports = Bearer;
