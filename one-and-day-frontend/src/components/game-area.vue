<template>
    <div class="game-area">
        <div class="game-area__time primary-color" v-if="number > 0">{{number}}</div>
        <!-- 纯聊天状态 -->
        <div class="game-area__view--chat" ref="chatBox" v-if="status === 'game_00'">
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
        <div class="game-area__view--game" v-if="status !== 'game_00'">
            <!-- 选择题 -->
            <div class="select_question" v-if="question.type === 'game_01'">
                <div class="title">{{question.title}}</div>
                <div class="option"
                     v-for="(item, index) in question.options" :key="index">{{item}}
                </div>
            </div>
            <!-- 简答题 抠图题 -->
            <div class="picture_question" v-else><img :src="question.img" alt=""></div>
        </div>
        <div class="game-area__operation">
            <div class="game-area__operation__button">
                <div class="game-area__operation__primary">
                    <el-button class="primary-color-pink" @click="changePrimary('pink')">B站粉</el-button>
                    <el-button class="primary-color-red" @click="changePrimary('red')">新年红</el-button>
                    <!-- <el-button class="primary-color-purple" @click="changePrimary('purple')">基佬紫</el-button> -->
                </div>
                <div class="game-area__operation__select">
                    <el-button v-for="(action,index) in this.operation" :key="index"
                               @click="operationSelect(action.key)"
                               :disabled="buttonStatus">
                        {{action.text}}
                    </el-button>
                </div>
            </div>
            <div class="game-area__operation__input">
                <el-input type="textarea" v-model="text" :disabled="inputStatus" @keyup.ctrl.enter.native="send"/>
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
            // 已选择答案
            hasSelect: false,
            // 输入文字
            text: '',
            operation: {},
            // 管理员操作按钮
            ADMIN_ACTION: [
                {
                    text: '选择',
                    key: 'game_01',
                },
                // {
                //     text: '简答',
                //     key: 'game_02',
                // }, {
                //     text: '抠图',
                //     key: 'game_03',
                // }, {
                //     text: '加时',
                //     key: 'game_04',
                // },
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
            timer: ''

        };
    },
    watch: {
        time(val) {
            if(val) {
                this.number = 10;
                clearInterval(this.timer)
                this.timer = setInterval(() => { 
                    this.number = this.number - 1;
                   if(this.number === 0 )  clearInterval(this.timer)
                }, 1000)
            }
        },
        question: {
            handler() {
                this.hasSelect = false;
            },
            deep: true,
        },
        messageList: {
            handler() {
                this.$nextTick(() => {
                    if (this.$refs.chatBox) {
                        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
                        console.log('refs', this.$refs.chatBox.scrollHeight);
                    }
                });
            },
            deep: true,
        },
    },
    computed: {
        ...mapState({
            status: state => state.status,
            isManager: state => state.isManager,
            userName: state => state.userName,
            time: state => state.time,
            question: state => state.question,
        }),
        inputStatus() {
            return !(this.isManager || ['game_00', 'game_02', 'game_03', 'game_04'].includes(this.status));
        },
        buttonStatus() {
            //  管理员 永远打开
            if (this.isManager && this.status === 'game_00') return false;
            // 
            if(this.isManager && this.status !== 'game_00') return true
            // 选择题状态下 切还没有进行选择
            if (['game_01', 'game_04'].includes(this.status) && !this.hasSelect) return false;
            // 其余状态
            return true;
            // return !(this.isManager || ['game_01', 'game_04'].includes(this.status));
        },
        messageList() {
            return this.$store.state.messageList;
        },
    },
    created() {
        this.operation = this.isManager ? this.ADMIN_ACTION : this.MEMBER_ACTION;
    },
    methods: {
        // 点击退出
        exit() {
            window.localStorage.clear();
            window.location.href = '/';
        },
        // 点击操作按钮
        operationSelect(val) {
            if (this.isManager) {
                this.startGame(val);
            } else {
                this.sendAnswer(val);
            }

        },
        // 开始游戏
        startGame(gameKey) {
            this.socket.emit('status', gameKey);
        },
        // 发送答案
        sendAnswer(answer) {
            this.hasSelect = true;
            this.socket.emit('answer', answer);
        },
        // 点击发送事件
        send() {
            if (!this.text || this.text.trim() === '') return;
            const info = this.text;
            // 游戏状态
            if (this.status !== 'game_00') {
                if (this.isManager) {
                    // 管理员发送 提示信息
                    this.sendTips(info);
                } else {
                    // 用户发送 答案
                    this.sendAnswer(info);
                }
            } else {
                // 非游戏状态 纯聊天
                this.sendNews(info);
            }
            this.text = '';
        },
        // 发送提示信息
        sendTips(info) {
            this.socket.emit('tip', info);
        },
        // 发送聊天信息
        sendNews(info) {
            this.socket.emit('message', info);
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
        .select_question {
            padding: 30px 20px 0 20px;
            .title {
                font-size: 18px;
                color: #000;
                font-weight: 550;
            }
            .option {
                margin: 5px 0;
                font-size: 16px;
            }
        }
        .picture_question {
            height: 100%;
            width: 100%;
            img {
                width: 100%;
            }
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