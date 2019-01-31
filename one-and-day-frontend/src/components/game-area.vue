<template>
    <div class="game-area">
        <div class="game-area__view">
            <!-- todo   显示窗口 -->
        </div>
        <div class="game-area__operation">
            <div class="game-area__operation__input">
                <el-input v-model="text"/> <el-button @click="send" :disabled="inputStatus">发送</el-button>    
            </div>
            <div class="game-area__operation__button">
                <el-button  v-for="(action,index) in this.operation" :key="index" 
                            @click="operationSelect(action.key)" 
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
            .game-area__operation__input{
                width: 100%;
                display: flex;
                justify-content: center;
                .el-input{
                    width:60%;
                }
                .el-button{
                    margin-left: 10px;
                    &:focus{
                        color: #606266;
                        border-color: #dcdfe6;
                        background-color: #fff;
                    }
                }
            }
            .game-area__operation__button{
                margin-top: 10px;
                width: 100%;
                display: flex;
                justify-content: center;
                .el-button{
                    width: 100px;
                }
            }
        }
    }
</style>