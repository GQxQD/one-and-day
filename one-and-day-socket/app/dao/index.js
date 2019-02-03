const redis = require('../utils/redis-util');
module.exports = {
    login(nickname) {
        return redis.hget('user', nickname);
    },
};