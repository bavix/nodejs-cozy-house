
const db = require('./db');

module.exports = async (req) => {
    const auth = req.get('Authorization');

    if (auth) {
        const values = auth.split(' ');
        if (values[0] && values[0].toLowerCase() === 'basic') {
            const buffer = Buffer.from(values[1], 'base64').toString();
            const [name, token] = buffer.split(':');

            return await db
                .one('select name from targets where token=$1 and name=$2', [token, name])
                .then((res) => {
                    req.appTarget = res.name;
                    return true;
                })
                .catch((err) => false);
        }
    }

    return false;
};
