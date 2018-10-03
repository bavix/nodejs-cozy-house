
const Store = require('./store');
const knex = require('../lib/db');

module.exports = async (ctx, next) => {
    const store = new Store(ctx);

    if (store.exists && !store.invalid) {
        if (!store.appTarget) {
            store.unauthorized();
        }

        return await next();
    }

    try {
        const { name } = await knex('targets')
            .select('name', 'active')
            .where({ token: store.token, active: true })
            .first();

        store.save(name);
    } catch (err) {
        store.save(null);
        store.unauthorized();
    }

    return await next();
};
