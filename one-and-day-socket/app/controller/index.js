const redisUtil = require('../utils/redis-util');
const service = require('../service');

function success(data = null, code = 0, message = '') {
    return {
        data,
        code,
        message,
    };
}

function failure(message = '', code = -1) {
    return {
        code,
        message,
    };
}

module.exports = {

    // 用户连接
    connected() {
        console.log('用户连接：', this.id);
        this.broadcast.emit('MESSAGE', this.id + ' 连接了');
    },
    // 登录
    async login(data, cb = () => undefined) {
        console.log('用户登录：', data);
        try {
            let res = await service.login(data.nickname, data.password);
            this.user = res;
            await service.join(res.nickname, res.token);
            let members = await service.getMemberList();
            this.emit('members', members);
            this.broadcast.emit('members', members);
            cb(success(res));
        } catch (e) {
            cb(failure(e.message));
        }
    },

    async checkAuth(cb = () => undefined) {
        // console.log('check', this.user);
        // if (this.user) {
        //     cb(success());
        //     return;
        // }
        // let info = await service.checkAuth();
        // console.log('info', info);
        if (this.user) {
            // this.user = await service.getUserByNickname(info);
            // console.log(this.user);
            cb(success());
        } else {
            cb(failure('用户还没登录'));
        }
    },

    async MESSAGE(data) {
        console.log(data);
        redisUtil.set('message', data);
        // console.log(redisUtil.hdel('hash', '123', '222'));
        console.log(await redisUtil.hset('hash', {
            username: 'kohai',
            password: '123456',
        }));
        this.broadcast.emit('MESSAGE', this.id + ': ' + data);
        this.emit('MESSAGE', data);
    },
    // 退出
    async disconnect(data, cb = () => undefined) {
        console.log('用户退出：', this.user);
        if (this.user) {
            await service.leave(this.user.token);
            let members = await service.getMemberList();
            this.emit('members', members);
            this.broadcast.emit('members', members);
        }

        // this.broadcast.emit('MESSAGE', this.id + ' 退出了');
    },
    message(message) {
        let msg = {
            nickname: this.user.nickname,
            time: (new Date()),
            message,
        };
        console.log('信息：', msg);
        this.broadcast.emit('message', msg);
        msg.isMy = true;
        this.emit('message', msg);
    },
    // 发送消息
    async sendUserNews(data, cb = () => undefined) {
        try {
            let res = await service.sendUserNews(data.nickname, data.info);
            cb(success(res));
        } catch (e) {
            cb(failure(e.message));
        }
    },
    // 管理员开始进行游戏 
    async startGame(data, cb = () => undefined) {
        try {
            let res = await service.startGame(data.nickname, data.gameKey);
            cb(success(res));
        } catch (e) {
            cb(failure(e.message));
        }
    },
    // 获取用户答案答案
    async getUserAnswer(data, cb = () => undefined) {
        try {
            let res = await service.getUserAnswer(data.nickname, data.answer);
            cb(success(res));
        } catch (e) {
            cb(failure(e.message));
        }
    },
    // 发送提示信息
    async sendTips(data, cb = () => undefined) {
        try {
            let res = await service.sendTips(data.nickname, data.tips);
            cb(success(res));
        } catch (e) {
            cb(failure(e.message));
        }
    },
};