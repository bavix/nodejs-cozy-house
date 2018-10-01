
const db = require('./db');

module.exports = async (ctx) => {
    const auth = ctx.get('Authorization');

    if (auth) {
        const [type, token] = auth.toLowerCase().split(' ');

        if (type === 'bearer') {
            return await db
                .one('select name, active from targets where token=$1', token)
                .then((res) => {
                    ctx.state.appTarget = res.name;
                    return res.active;
                })
                .catch((err) => false);
        }
    }

    return false;
};
