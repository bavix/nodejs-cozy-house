
/**
 * @param {EventStore} store
 * @param conn
 *
 * @return {Function}
 */
module.exports = (store, conn) => {
    return () => {
        store.flush(() => {
            conn.close(() => {
                process.exit(1)
            });
        });
    }
};
