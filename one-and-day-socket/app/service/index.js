const dao = require('../dao');

module.exports = {
    async login(nickname, password) {
        if (nickname && password) {
            let user = await dao.login(nickname);
            if (user) {
                user = JSON.parse(user);
                if (user.password === password) {
                    user.password = '';
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
};