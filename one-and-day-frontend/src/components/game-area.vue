<template>
    <div class="game-area">
        <div class="game-area__view--chat" v-if="gameStatus === GAME_STATUS.CHAT">
            <div v-for="(msg,index) in chatList" :key="index" 
                 :class="msg.isMy? 'game-area__view__item--my-self' : 'game-area__view__item'">
                <div class="item__name">
                    <span>{{msg.name}}</span>
                    <span class="time">{{msg.time}}</span>   
                </div>
                <div class="item__msg">{{msg.message}}</div>
                <div class="item__arrows"></div>
            </div>
        </div>
        <div class="game-area__view--game" v-if="gameStatus ===GAME_STATUS.GAME">
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
                    <el-button  v-for="(action,index) in this.operation" :key="index" 
                                @click="operationSelect(action.key)"
                                :disabled="buttonStatus">
                        {{action.text}}
                    </el-button>
                </div>
            </div>
            <div class="game-area__operation__input">
                <el-input type="textarea" v-model="text"/>
                <div class="operation__input__button">
                    <el-button class="el-button__exit" @click="exit">退出</el-button>
                    <el-button  @click="send" >发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            operation: {},
            // 管理员操作按钮
            ADMIN_ACTION: [
                {
                    text: '选择',
                    key: 'A'
                },{
                    text: '简答',
                    key: 'B'
                },{
                    text: '抠图',
                    key: 'C'
                },{
                    text: '加时',
                    key: 'D'
                }
            ],
            // 用户操作按钮
            MEMBER_ACTION:[
                {
                    text: 'A',
                    key: 'A'
                },{
                    text: 'B',
                    key: 'B'
                },{
                    text: 'C',
                    key: 'C'
                },{
                    text: 'D',
                    key: 'D'
                }
            ],
            // 问题图片
            questionUrl: '../assets/login.png',
            // 游戏状态
            GAME_STATUS: {
                CHAT: 'chat',
                GAME: 'game'
            },
            chatList: [
                {name: '吱吱', time: '2018-11-21 22:22:22', message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好'},
                {name: '柯灰', isMy: true, time: '2018-11-21 22:22:22', message: '你好'},
                {name: '大条狗', time: '2018-11-21 22:22:22', message: '你好'},
                {name: '姑获鸟', time: '2018-11-21 22:22:22', message: '你好'},
                {name: '情形等', time: '2018-11-21 22:22:22', message: '你好'},
            ]
        }
    },
    computed: {
        ...mapState({
            status: state => state.status,
            userType: state => state.userType,
            gameStatus: state => state.gameStatus
            }),
        inputStatus(){
            return !(this.userType === 'admin' || this.status === 'input')
        },
        buttonStatus(){
            return !(this.userType === 'admin' || this.status === 'select')
        }
    },
    created () {
         this.operation = this.userType === 'admin'?  this.ADMIN_ACTION : this.MEMBER_ACTION
    },
    methods: {
        // 退出
        exit(){
            this.$router.replace({name: 'login'})
        },
        send(){
            // 发送内容
        },
        operationSelect(val){
            // 发送选择
            console.log(val)
        },
        // 更换主题色
        changePrimary(name){
            document.getElementById('app').className = 'app' + ' ' +'theme-' + name;
        }
    }
}
</script>
<style lang="less">
    .game-area{
        width: 100%;
        height: 100%;
        .game-area__view--chat{
            width: 100%;
            height: calc(100% - 200px);
            border: none;
            background: #eeeeee;
            overflow: auto;
            text-align: left;
            .game-area__view__item{
                position: relative;
                padding: 5px 15px;
                .item__name{
                    font-size: 14px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    .time{
                        margin-left: 10px;
                        font-size: 12px;
                        color: #c7c7c7;
                    }
                }
                .item__msg{
                    display: inline-block;
                    padding: 3px;
                    background: #fff;
                    border: 1px solid #e9e9e9;
                    border-radius: 3px;
                    font-size: 16px;
                }
                .item__arrows{
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
            .game-area__view__item--my-self{
                position: relative;
                padding: 5px 15px;
                text-align: right;
                .item__name{
                    display: flex;
                    flex-flow: row-reverse nowrap;
                    align-items: center;
                    font-size: 14px;
                    height: 25px;
                    .time{
                        margin-right: 10px;
                        font-size: 12px;
                        color: #c7c7c7;
                    }
                }
                .item__msg{
                    display: inline-block;
                    padding: 3px;
                    background: #fff;
                    border: 1px solid #e9e9e9;
                    border-radius: 3px;
                    font-size: 16px;
                }
                .item__arrows{
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
        .game-area__view--game{
            width: 100%;
            height: calc(100% - 200px);
            border: none;
            background: #eeeeee;
            overflow: auto;
            text-align: left;
            img{
                width: 100%;
            }
        }
        .game-area__operation{
            height: 200px;
            background: #ffffff;
            .game-area__operation__button{
                padding: 0 10px;
                display: flex;
                height: 40px;
                justify-content: space-between;
                background: #aaaaaa;
                align-items: center;
                .game-area__operation__primary{
                    display: flex;
                    .el-button{
                        width: 60px;
                        height: 30px;
                    }
                }
                .game-area__operation__select{
                    display: flex;
                    .el-button{
                        width: 30px;
                        height: 30px;
                        border-radius:100%;
                        border: none; 
                    }
                }
            }
            .game-area__operation__input{
                display: flex;
                flex-flow: column nowrap;
                align-items: flex-end;
                .el-textarea{
                    height: 60px;
                    width:100%;
                    border-radius: 0;
                    .el-textarea__inner{
                        height: 60px;
                        border-radius: 0;
                    }
                }
                .operation__input__button{
                    display: flex;
                    padding-top: 5px;
                    .el-button__exit{
                        background-color: #aaaaaa !important;
                    }
                }
                .el-button{
                    margin-left: 0;
                    margin-right: 20px;
                    width: 60px;
                    height: 30px;
                }
            }
        }
    }
</style>