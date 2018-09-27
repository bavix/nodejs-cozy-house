
const fs = require('fs');

module.exports = (store, conn) => {
    return () => {
        conn.close(() => process.exit(1));
    }
};
