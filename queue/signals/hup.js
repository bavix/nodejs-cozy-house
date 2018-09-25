
const ClickHouse = require('@apla/clickhouse');
const ch = new ClickHouse({
    host: process.env.CLICKHOUSE_HOST,
    port: process.env.CLICKHOUSE_PORT,
    auth: process.env.CLICKHOUSE_AUTH
});

module.exports = (conn) => {
    return () => {
        conn.close(() => process.exit(1));
    }
};
