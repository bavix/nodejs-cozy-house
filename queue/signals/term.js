
const fs = require('fs');

module.exports = (conn) => {
    return () => {
        conn.close(() => process.exit(1));
    }
};
