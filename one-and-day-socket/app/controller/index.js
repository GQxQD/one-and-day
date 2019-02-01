module.exports = {

    // 用户连接
    connected() {
        console.log('用户连接：', this.id);
        this.broadcast.emit('MESSAGE', this.id + ' 连接了');
    },

    login(data, cb) {
        console.log('用户登录：', data);
        cb(data);
    },

    MESSAGE(data) {
        console.log(data);
        this.broadcast.emit('MESSAGE', this.id + ': ' + data);
        this.emit('MESSAGE', data);
    },

    disconnect() {
        console.log('用户退出：');
        this.broadcast.emit('MESSAGE', this.id + ' 退出了');
    },
};

