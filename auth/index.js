
const db = require('./db');

module.exports = async (req) => {
    const auth = req.get('Authorization');

    if (auth) {
        const [type, token] = auth.toLowerCase().split(' ');

        if (type === 'bearer') {
            return await db
                .one('select name, active from targets where token=$1', token)
                .then((res) => {
                    req.appTarget = res.name;
                    return res.active;
                })
                .catch((err) => false);
        }
    }

    return false;
};
