const redisUtil = require('../utils/redis-util');
const service = require('../service');
const questions = require('../question');

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

let timer1 = null;
let timer2 = null;
let currentIndex = -1;
// 问题延迟时间
const questionDelay = 10000;
// 问题分数
const questionScore = 1;
const questionLength = questions.length;

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
            let status = await service.getStatus() || 'game_00';
            this.emit('status', status);
            cb(success(res));
        } catch (e) {
            cb(failure(e.message));
        }
    },

    async status(status = 'game_00') {
        console.log('游戏状态：', status);
        if (this.user && this.user.isManager) {
            console.log('管理', this.user);
            await service.setStatus(status);
            this.emit('status', status);
            this.broadcast.emit('status', status);
            if (status === 'game_01') {
                this.emit('tip', '10s后开始选择题');
                this.broadcast.emit('tip', '10s后开始选择题');
                clearInterval(timer1);
                clearTimeout(timer2);
                currentIndex = -1;
                timer1 = setInterval(() => {
                    currentIndex++;
                    // 当 结束的时候
                    if (currentIndex >= questionLength) {
                        clearInterval(timer1);
                        this.emit('tip', '结束答题');
                        this.broadcast.emit('tip', '结束答题');
                        service.setStatus('game_00');
                        this.emit('status', 'game_00');
                        this.broadcast.emit('status', 'game_00');
                        return;
                    }
                    let question = {
                        ...questions[currentIndex],
                        title: `（${currentIndex + 1} / ${questionLength}）` + questions[currentIndex].title,
                        answer: '',
                    };
                    this.emit('question', question);
                    this.broadcast.emit('question', question);
                }, questionDelay);
                // 防止错乱
                setTimeout(() => {
                    clearInterval(timer1);
                    clearTimeout(timer2);
                }, questionLength * questionDelay + 10000);
                // this.emit('question', {
                //     'title': '（该题目不计分）请问大家想看会长女装吗？',
                //     'type': 'game_01',
                //     'img': '',
                //     'options': [
                //         'A:想',
                //         'B:超级想',
                //         'C:说不想实际很想',
                //         'D:没有一天不在想',
                //     ],
                // });
            }
        } else {
            this.emit('logout');
        }
    },

    async answer(a) {
        if (!this.user) {
            this.emit('logout');
            return;
        }
        if (currentIndex < 0) {
            this.emit('tip', '还没开始呢');
            return;
        }
        // if (this.a) {
        //     this.emit('tip', '已经过了');
        //     return;
        // }
        // this.a = a;
        let question = questions[currentIndex];
        console.log(question);
        if (question.answer) {
            const result = question.answer === a;
            if (result) {
                await service.addScore(this.user.nickname, questionScore);
                let members = await service.getMemberList();
                this.emit('members', members);
                this.broadcast.emit('members', members);
            }
            this.emit('tip', `你选了 ${a}，${result ? '答对了' : ('答错了，正确答案是' + question.answer)}`);
        } else {
            this.emit('tip', '该题没有确定答案');
        }
        console.log(a);
    },

    tip(message) {
        if (this.user && this.user.isManager) {
            if (message === 'SHUTDOWN') {
                service.setStatus('game_00');
                this.emit('status', 'game_00');
                this.broadcast.emit('status', 'game_00');
                clearInterval(timer1);
                clearTimeout(timer2);
                return;
            }
            this.emit('tip', this.user.nickname + ': ' + message);
            this.broadcast.emit('tip', this.user.nickname + ': ' + message);
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
        if (this.user) {
            if (this.user.isManager) {
                if (message === 'SHUTDOWN') {
                    service.setStatus('game_00');
                    this.emit('status', 'game_00');
                    this.broadcast.emit('status', 'game_00');
                    clearInterval(timer1);
                    clearTimeout(timer2);
                    return;
                }
            }
            let msg = {
                nickname: this.user.nickname,
                time: (new Date()),
                message,
            };
            console.log('信息：', msg);
            this.broadcast.emit('message', msg);
            msg.isMy = true;
            this.emit('message', msg);
        }
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