const Redis = require('ioredis');
const redisConfig = require('../config/redis.config');

class RedisUtil {

    constructor() {
        this.redis = new Redis(redisConfig);
    }

    set(key, value) {
        return this.redis.set(key, value);
    }

    get(key) {
        return new Promise(((resolve, reject) => {
            this.redis.get(key, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }));
    }

    hset(where, data) {
        const keys = Object.entries(data);
        return this.redis.hset(where, ...keys);
    }

    hdel(where, key) {
        return this.redis.hdel(where, key);
    }

    hget(where, key) {
        return this.redis.hget(where, key);
    }

    hgetall(where) {
        return this.redis.hgetall(where);
    }

}

module.exports = new RedisUtil();