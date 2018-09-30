
const Url = require('./url');
const pgp = require("pg-promise")();
const url = new Url({
    schema: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    path: process.env.DATABASE_NAME
});

module.exports = pgp(url.toString());
