<template>
    <div class="game-area">
        <div class="game-area__view">
            <!-- todo   显示窗口 -->
        </div>
        <div class="game-area__operation">
            <div class="game-area__operation__primary">
                <el-button class="primary-color-pink" @click="changePrimary('pink')">B站粉</el-button>
                <el-button class="primary-color-red" @click="changePrimary('red')">新年红</el-button>
                <el-button class="primary-color-purple" @click="changePrimary('purple')">基佬紫</el-button>
            </div>
            <div class="game-area__operation__input">
                <!-- :disabled="inputStatus" -->
                <el-input v-model="text"/> <el-button  @click="send" >发送</el-button>    
            </div>
            <div class="game-area__operation__button">
                <el-button  v-for="(action,index) in this.operation" :key="index" 
                            @click="operationSelect(action.key)"
                            :class="index ? 'ml20': 'ml0'"
                            :disabled="buttonStatus">
                    {{action.text}}
                </el-button>
                <!-- <el-button @click="operationSelect(operation.B)" :disabled="buttonStatus">{{operation.B}}</el-button>
                <el-button @click="operationSelect(operation.C)" :disabled="buttonStatus">{{operation.C}}</el-button>
                <el-button @click="operationSelect(operation.D)" :disabled="buttonStatus">{{operation.D}}</el-button> -->
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
            ]
        }
    },
    computed: {
        ...mapState({
            status: state => state.status,
            userType: state => state.userType
            }),
        inputStatus(){
            if(this.userType === 'admin' || this.status === 'input') {
                return false
            }
            return true
        },
        buttonStatus(){
            if(this.userType === 'admin' || this.status === 'select') {
                return false
            }
            return true
        }
    },
    created () {
         this.operation = this.userType === 'admin'?  this.ADMIN_ACTION : this.MEMBER_ACTION
    },
    methods: {
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
        padding-right: 2px;
        .game-area__view{
            width: 100%;
            height: calc(100% - 210px);
            border: 1px solid #d9d9d9;
            border-radius: 5px;
            box-shadow: 0px 0px 10px #999999;
            margin-bottom: 10px;
        }
        .game-area__operation{
            height: 200px;
            border: 1px solid #d9d9d9;
            border-radius: 5px;
            box-shadow: 0px 0px 10px #999999;
            .game-area__operation__primary{
                margin-top: 10px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                .el-button{
                    width: 60px;
                    height: 30px;
                }
            }
            .game-area__operation__input{
                margin-top: 15px;
                display: flex;
                justify-content: center;
                .el-input{
                    height: 30px;
                    width:60%;
                    .el-input__inner{
                        height: 30px;
                        line-height: 30px;
                    }
                }
                .el-button{
                    width: 60px;
                    height: 30px;
                    margin-left: 10px;
                }
            }
            .game-area__operation__button{
                margin-top: 15px;
                width: 100%;
                display: flex;
                justify-content: center;
                .el-button{
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                }
            }
        }
    }
</style>