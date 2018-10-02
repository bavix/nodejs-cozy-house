
const Store = require('./store');
const knex = require('./db');

module.exports = async (ctx, next) => {
    const store = new Store(ctx);

    if (store.exists) {
        if (store.invalid) {
            return store.unauthorized();
        }

        return next();
    }

    try {
        const { name } = await knex('targets')
            .select('name', 'active')
            .where({ token: store.token, active: true })
            .first();

        store.save(name);
        return next();
    } catch (err) {
        return store.unauthorized();
    }
};
