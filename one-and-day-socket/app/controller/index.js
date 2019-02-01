module.exports = {

    // 用户连接
    connected() {
        console.log('用户连接：', this.id);
    },

    login(data, cb) {
        console.log('用户登录：', data);
        cb(data);
    },

    MESSAGE(data) {
        console.log(data);
        this.nsp.emit('MESSAGE', this.id + '  进来了')
        // this.emit('MESSAGE', data);
    },

    disconnect() {
        console.log('用户退出：');
    },
};

