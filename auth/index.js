
const db = require('./db');

module.exports = async (ctx, next) => {
    const auth = ctx.get('Authorization');

    if (auth) {
        const [type, token] = auth.toLowerCase().split(' ');

        if (type === 'bearer') {
            return await db
                .one('select name, active from targets where token=$1', token)
                .then((res) => {
                    ctx.state.appTarget = res.name;

                    if (!res.active) {
                        ctx.throw(401);
                    }

                    return next();
                })
                .catch((err) => {
                    ctx.throw(401);
                });
        }
    }

    ctx.throw(401);
};
