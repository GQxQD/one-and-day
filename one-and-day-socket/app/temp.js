const redisUtil = require('./utils/redis-util');

function random() {
    let arr = (new Array(6)).fill(1);
    arr = arr.map(() => ~~(Math.random() * 10));
    return arr.join('');
}

function init() {
    const data = [
        { isManager: true, nickname: '姑获鸟', password: '' },
        { isManager: true, nickname: '靊塵', password: '' },
        { isManager: true, nickname: '吱吱丶靈', password: '' },
        { isManager: true, nickname: '荆礼', password: '' },
        { isManager: true, nickname: '柯灰', password: '' },
        { isManager: true, nickname: '半圆', password: '' },
        { isManager: true, nickname: 'X.Y.T', password: '' },
        { isManager: true, nickname: '雕兄', password: '' },
        { isManager: true, nickname: '大天狗', password: '' },
        { nickname: '大天狗的呆毛啊', password: '' },
        { nickname: 'Troyep', password: '' },
        { nickname: '结束还是开始', password: '' },
        { nickname: '没什么好喜欢的', password: '' },
        { nickname: '的千酱（只养一个贝贝头）', password: '' },
        { nickname: '在人海茫茫', password: '' },
        { nickname: '你猜我在哪', password: '' },
        { nickname: '柒十七', password: '' },
        { nickname: '猪猪北鼻、', password: '' },
        { nickname: '三木杉山', password: '' },
        { nickname: 'J追魂流水', password: '' },
        { nickname: '众里寻人', password: '' },
        { nickname: '阴森的不洁庭院', password: '' },
        { nickname: '江门小白', password: '' },
        { nickname: '须臾泪', password: '' },
        { nickname: '香草绵绵冰喵', password: '' },
        { nickname: '韩红喊韩寒坏坏', password: '' },
        { nickname: '抹茶慕斯', password: '' },
        { nickname: '却比高达', password: '' },
        { nickname: '出来吧召唤兽', password: '' },
        { nickname: '冷沫', password: '' },
        { nickname: '灼眼的皮卡丘', password: '' },
        { nickname: '玉树临风磊宝宝i', password: '' },
        { nickname: '芬姐的宝宝', password: '' },
        { nickname: 'Collidex', password: '' },
        { nickname: '阿鱼是条小咸鱼w', password: '' },
        { nickname: '业不繁', password: '' },
        { nickname: 'Hinayi', password: '' },
        { nickname: '最恨难赴故人约', password: '' },
        { nickname: '北冥游鱼', password: '' },
        { nickname: '性感az在线抽R', password: '' },
        { nickname: '灯影繁花', password: '' },
        { nickname: '红糖糯米糕', password: '' },
        { nickname: '小white', password: '' },
        { nickname: '那夜你真贱', password: '' },
        { nickname: '宇小格', password: '' },
        { nickname: '潮湿的百邪精灵', password: '' },
        { nickname: '每日欧皇灬真好', password: '' },
        { nickname: '酥糖少女w', password: '' },
        { nickname: '小李子不是人', password: '' },
        { nickname: '冰镇西瓜来一口', password: '' },
        { nickname: '你看萌萌哒', password: '' },
        { nickname: '月墨风川', password: '' },
        { nickname: '北帝凉城～', password: '' },
        { nickname: '朱红之月', password: '' },
        { nickname: '如意师', password: '' },
        { nickname: '爱吃橙子的小摩羯', password: '' },
        { nickname: '春风十里柔情', password: '' },
        { nickname: '此君', password: '' },
        { nickname: '有马公主', password: '' },
        { nickname: '左左是我', password: '' },
        { nickname: '蠢萌丿北方', password: '' },
        { nickname: '小米粥姐姐呀', password: '' },
        { nickname: '若华何光', password: '' },
        { nickname: '请以你的名字唤我', password: '' },
        { nickname: '半兽', password: '' },
        { nickname: '裁', password: '' },
        { nickname: '坏死', password: '' },
        { nickname: '時屿', password: '' },
        { nickname: '逗比的胖次', password: '' },
        { nickname: '晓曦', password: '' },
        { nickname: '想吃火锅de咸鱼', password: '' },
        { nickname: '纯真的无常墨笔', password: '' },
        { nickname: '18厘米小MM', password: '' },
        { nickname: '一个抽卡', password: '' },
        { nickname: '月之幽寒', password: '' },
        { nickname: '九媗', password: '' }];
    const data2 = data.map(item => ({
        [item.nickname]: JSON.stringify({
            ...item,
            password: random(),
        }),
    }));

    console.log(data2);
    setTimeout(() => {
        data2.forEach(item => {
            redisUtil.hset('user', item);
        });
    }, 3000);
}

// redisUtil.hgetall('user').then(data => {
//     let d = [];
//     for (let i in data) {
//         va = data[i];
//         d.push(JSON.parse(va));
//     }
//     console.log(d);
// });

redisUtil.lpush('test', '2');
redisUtil.lpush('test', '11211');
redisUtil.lpush('test', '11211');
redisUtil.lpush('test', '2222');

redisUtil.lrange('test', 0, 2).then(console.log);