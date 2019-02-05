const redis = require('../utils/redis-util');
module.exports = {
    getUserByNickname(nickname) {
        return redis.hget('user', nickname);
    },
    join(nickname, id) {
        return redis.hset('token', { [id]: nickname });
    },
    leave(id) {
        return redis.hdel('token', id);
    },
    getMemberList() {
        return redis.hgetall('token');
    },
    checkAuth(id) {
        return redis.hget('token', id);
    },
    getStatus() {
        return redis.get('status');
    },
    setStatus(status) {
        return redis.set('status', status);
    },
    setScore(score) {
        return redis.hset('score', score);
    },
    getScore(nickname) {
        return redis.hget('score', nickname);
    },
    getScores() {
        return redis.hgetall('score');
    },
};