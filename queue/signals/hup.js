
/**
 * @param {EventStore} store
 *
 * @return {Function}
 */
module.exports = (store) => {
    return store.flush;
};
