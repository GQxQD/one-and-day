const uuid = require('uuid');
const dao = require('../dao');

module.exports = {
    async login(nickname, password) {
        if (nickname && password) {
            let user = await dao.getUserByNickname(nickname);
            if (user) {
                user = JSON.parse(user);
                if (user.password === password) {
                    user.password = '';
                    user.token = uuid();
                    return user;
                } else {
                    throw new Error('密码不正确');
                }
            } else {
                throw new Error('昵称不存在');
            }
        } else {
            throw new Error('昵称或密码不能为空');
        }
    },
    async join(nickname, id) {
        return await dao.join(nickname, id);
    },
    async leave(id) {
        return await dao.leave(id);
    },
    async getMemberList() {
        let list = await dao.getMemberList();
        let arr = [];
        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                arr.push(list[key]);
            }
        }
        return [...new Set(arr)];
    },
    async checkAuth(token) {
        return await dao.checkAuth(token);
    },
    async getUserByNickname(nickname) {
        return await dao.getUserByNickname(nickname);
    },

    async getStatus() {
        return await dao.getStatus();
    },

    async setStatus(status) {
        return await dao.setStatus(status);
    },

    // 发送消息
    sendUserNews(name, info) {
        // TODO 获取用户发过来的消息 将用户名和消息还有当前时间合成一个对象添加到用户信息列表中返回给前端监听并进行列表更新
        return {
            name: name,
            info: info,
        };
    },
    // 开始游戏
    async startGame(name, gameKey) {
        // TODO 获取管理员发送过来的启动的游戏的类型 返回当前的游戏类型的图片 
        // 以每张图片固定的时间进行倒计时发送给前端
        // 返回值 
        return {
            name: name,
            gameKey: gameKey,
        };
    },
    // 发送答案
    // TODO 获取用户发送过来的答案 将答案和正确答案进行匹配
    // 个人想法 因为前端没有控制用户回答问题的次数，所以如果是选择题的时候，只获取第一次答题的选择，然后后面的答案都不计算。等下一题再接收新的答案
    // 简答题的就以答对后答案不进行判断。都是用一个布尔值来进行已答题（选择）和已答对（简答）的判断；
    async getUserAnswer(name, answer) {
        return {
            name: name,
            answer: answer,
        };
    },
    // 发送提示信息
    // TODO 管理员发送的提示信息对全体成员进行广播
    async sendTips(name, tips) {
        return {
            name: name,
            tips: tips,
        };
    },
};