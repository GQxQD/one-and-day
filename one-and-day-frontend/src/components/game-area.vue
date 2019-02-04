<template>
    <div class="game-area">
        <div class="game-area__tips primaryback-ground" v-if="tips"><i class="el-icon-bell"></i> {{tips}}</div>
        <div class="game-area__time primary-color" v-if="number > 0">{{number}}</div>
        <!-- 纯聊天状态 -->
        <div class="game-area__view--chat" v-if="status === 'game_01'">
            <div v-for="(msg,index) in messageList" :key="index"
                 :class="msg.isMy? 'game-area__view__item--my-self' : 'game-area__view__item'">
                <div class="item__name">
                    <span>{{msg.nickname}}</span>
                    <span class="time">{{new Date(msg.time).toLocaleString()}}</span>
                </div>
                <div class="item__msg">{{msg.message}}</div>
                <div class="item__arrows"></div>
            </div>
        </div>
        <!-- 游戏状态 -->
        <div class="game-area__view--game" v-if="status !== 'game_01'">
            <img :src="questionUrl" alt="">
        </div>
        <div class="game-area__operation">
            <div class="game-area__operation__button">
                <div class="game-area__operation__primary">
                    <el-button class="primary-color-pink" @click="changePrimary('pink')">B站粉</el-button>
                    <el-button class="primary-color-red" @click="changePrimary('red')">新年红</el-button>
                    <el-button class="primary-color-purple" @click="changePrimary('purple')">基佬紫</el-button>
                </div>
                <div class="game-area__operation__select">
                    <el-button v-for="(action,index) in this.operation" :key="index"
                               @click="operationSelect(action.key)"
                               :disabled="buttonStatus">
                        {{action.text}}
                    </el-button>
                </div>
            </div>
            {{inputStatus}} {{isManager}} {{['game_00', 'game_02', 'game_03', 'game_04'].includes(this.status)}}
            <div class="game-area__operation__input">
                <el-input type="textarea" v-model="text"/>
                <div class="operation__input__button">
                    <el-button class="el-button__exit" @click="exit">退出</el-button>
                    <el-button @click="send" :disabled="inputStatus">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            // 倒计时数字
            number: 0,
            // 输入文字
            text: '',
            operation: {},
            // 管理员操作按钮
            ADMIN_ACTION: [
                {
                    text: '选择',
                    key: 'game_01',
                }, {
                    text: '简答',
                    key: 'game_02',
                }, {
                    text: '抠图',
                    key: 'game_03',
                }, {
                    text: '加时',
                    key: 'game_04',
                },
            ],
            // 用户操作按钮
            MEMBER_ACTION: [
                {
                    text: 'A',
                    key: 'A',
                }, {
                    text: 'B',
                    key: 'B',
                }, {
                    text: 'C',
                    key: 'C',
                }, {
                    text: 'D',
                    key: 'D',
                },
            ],
            // 问题图片
            questionUrl: '../assets/login.png',
            // 游戏状态
            GAME_STATUS: {
                CHAT: 'chat',
                GAME: 'game',
            },
            chatList: [
                { name: '吱吱', time: '2018-11-21 22:22:22', message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好' },
                { name: '柯灰', isMy: true, time: '2018-11-21 22:22:22', message: '你好' },
                { name: '大条狗', time: '2018-11-21 22:22:22', message: '你好' },
                { name: '姑获鸟', time: '2018-11-21 22:22:22', message: '你好' },
                { name: '情形等', time: '2018-11-21 22:22:22', message: '你好' },
            ],
        };
    },
    watch: {
        tips(val) {
            if (val) {
                setTimeout(() => {
                    this.$store.commit('setTips', '');
                    // this.tipsMessage = ''
                }, 5000);
            }
        },
    },
    computed: {
        ...mapState({
            status: state => state.status,
            isManager: state => state.isManager,
            userName: state => state.userName,
            tips: state => state.tips,
        }),
        inputStatus() {
            return !(this.isManager || ['game_00', 'game_02', 'game_03', 'game_04'].includes(this.status));
        },
        buttonStatus() {
            return !(this.isManager || ['game_01', 'game_04'].includes(this.status));
        },
        messageList() {
            return this.$store.state.messageList;
        },
    },
    created() {
        this.operation = this.isManager ? this.ADMIN_ACTION : this.MEMBER_ACTION;
    },
    methods: {
        // 倒计时
        countDown(time) {
            if (this.time === 0) return;
            this.number = time + 0;
            setTimeout(() => {
                this.countDown(this.number - 1);
            }, 1000);
        },
        // 点击退出
        exit() {
            // this.socket.emit('disconnect', {nickname: this.userName}, (res) => {
            //     console.log(res)
            // });
            // this.$router.replace({name: 'login'});
            window.localStorage.clear();
            window.location.href = '/';
        },
        // 点击操作按钮
        operationSelect(val) {
            this.countDown(20);
            if (this.isManager) {
                this.startGame(val);
            } else {
                this.sendAnswer(val);
            }

        },
        // 开始游戏
        startGame(gameKey) {
            this.socket.emit('startGame', { nickname: this.userName, gameKey: gameKey }, (res) => {
                if (res && res.code === 0) {
                    console.log('前端开启游戏', res);
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 发送答案
        sendAnswer(answer) {
            this.socket.emit('getUserAnswer', { nickname: this.userName, answer: answer }, (res) => {
                if (res && res.code === 0) {
                    console.log('发送答案', res);
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 点击发送事件
        send() {
            const info = this.text;
            this.socket.emit('message', this.text);
            // 游戏状态
            if (this.status !== 'game_00') {
                if (this.isManager) {
                    // 管理员发送 提示信息
                    console.log('管理员提示');
                    this.sendTips(info);
                } else {
                    // 用户发送 答案
                    console.log('用户答案');
                    this.sendAnswer(info);
                }
            } else {
                // 非游戏状态 纯聊天
                console.log('纯聊天');
                this.sendNews(info);
            }

        },
        // 发送提示信息
        sendTips(info) {
            this.socket.emit('sendTips', { nickname: this.userName, tips: info }, (res) => {
                if (res && res.code === 0) {
                    console.log('发送提示信息', res);
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 发送聊天信息
        sendNews(info) {
            this.socket.emit('sendUserNews', { nickname: this.userName, info: info }, (res) => {
                if (res && res.code === 0) {
                    console.log('发送聊天信息', res);
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 获取聊天信息
        getUserChatList() {
            // todo 获取用户聊天信息列表
            this.socket.on('sendUserNews', (data) => {
                // 跟新用户聊天列表
                this.chatList = data;
            });
        },
        // 获取游戏状态
        getGameStatus() {
            // todo 获取当前的游戏状态 在每道题的答题时间在header给一个时间倒计时,是你那边每次都返回来一个数字然后我用setTimeout进行递减?
            this.socket.on('sendUserNews', (data) => {
                // 改变当前游戏状态
                this.$store.commit('setStatus', data);
            });
        },
        // 获取提示信息
        getTips() {
            // todo 获取提示信息
            this.socket.on('sendUserNews', (data) => {
                // 获取用户提示信息
                this.$store.commit('setTips', data);
            });
        },
        // 更换主题色
        changePrimary(name) {
            document.getElementById('app').className = 'app' + ' ' + 'theme-' + name;
        },
    },
};
</script>
<style lang="less">
.game-area {
    width: 100%;
    height: 100%;
    position: relative;
    .game-area__tips {
        position: absolute;
        left: 50%;
        top: 5px;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        border-radius: 4px;
        transform: translateX(-50%)
    }
    .game-area__time {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 25px;
        z-index: 999;
        opacity: 0.3;
    }
    .game-area__view--chat {
        width: 100%;
        height: calc(100% - 200px);
        border: none;
        background: #eeeeee;
        overflow: auto;
        text-align: left;
        .game-area__view__item {
            position: relative;
            padding: 5px 15px;
            .item__name {
                font-size: 14px;
                height: 25px;
                display: flex;
                align-items: center;
                .time {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #c7c7c7;
                }
            }
            .item__msg {
                display: inline-block;
                padding: 3px;
                background: #fff;
                border: 1px solid #e9e9e9;
                border-radius: 3px;
                font-size: 16px;
            }
            .item__arrows {
                position: absolute;
                left: 22px;
                top: 27px;
                width: 8px;
                height: 8px;
                border-radius: 2px;
                border-top: 1px solid #e9e9e9;
                border-left: 1px solid #e9e9e9;
                transform: rotate(45deg);
                background: #fff;
            }
        }
        .game-area__view__item--my-self {
            position: relative;
            padding: 5px 15px;
            text-align: right;
            .item__name {
                display: flex;
                flex-flow: row-reverse nowrap;
                align-items: center;
                font-size: 14px;
                height: 25px;
                .time {
                    margin-right: 10px;
                    font-size: 12px;
                    color: #c7c7c7;
                }
            }
            .item__msg {
                display: inline-block;
                padding: 3px;
                background: #fff;
                border: 1px solid #e9e9e9;
                border-radius: 3px;
                font-size: 16px;
            }
            .item__arrows {
                position: absolute;
                right: 22px;
                top: 27px;
                width: 8px;
                height: 8px;
                border-radius: 2px;
                border-top: 1px solid #e9e9e9;
                border-left: 1px solid #e9e9e9;
                transform: rotate(45deg);
                background: #fff;
            }
        }
    }
    .game-area__view--game {
        width: 100%;
        height: calc(100% - 200px);
        border: none;
        background: #eeeeee;
        overflow: auto;
        text-align: left;
        img {
            width: 100%;
        }
    }
    .game-area__operation {
        height: 200px;
        background: #ffffff;
        .game-area__operation__button {
            padding: 0 10px;
            display: flex;
            height: 40px;
            justify-content: space-between;
            background: #aaaaaa;
            align-items: center;
            .game-area__operation__primary {
                display: flex;
                .el-button {
                    width: 60px;
                    height: 30px;
                }
            }
            .game-area__operation__select {
                display: flex;
                .el-button {
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    border: none;
                }
            }
        }
        .game-area__operation__input {
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-end;
            .el-textarea {
                height: 60px;
                width: 100%;
                border-radius: 0;
                .el-textarea__inner {
                    height: 60px;
                    border-radius: 0;
                }
            }
            .operation__input__button {
                display: flex;
                padding-top: 5px;
                .el-button__exit {
                    background-color: #aaaaaa !important;
                }
            }
            .el-button {
                margin-left: 0;
                margin-right: 20px;
                width: 60px;
                height: 30px;
            }
        }
    }
}
</style>