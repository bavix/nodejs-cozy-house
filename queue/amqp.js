
const { connect } = require('amqplib');
const params = {
    hostname: process.env.QUEUE_HOST,
    port: process.env.QUEUE_PORT,
    username: process.env.QUEUE_USER,
    password: process.env.QUEUE_PASSWORD,
};

/**
 * @param options
 * @return {Promise}
 */
module.exports = (options) => {
    return connect(params, options);
};
